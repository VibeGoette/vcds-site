import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayloadClient } from '@/lib/payload'

// In-memory rate limiter — works within a single serverless instance.
// On Vercel (stateless), this resets on cold starts and cannot prevent
// distributed attacks. For production hardening, add Cloudflare Turnstile
// (NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY) or Upstash Redis.
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 Minuten
const MIN_SUBMISSION_TIME_MS = 3000 // Mensch braucht mind. 3s fuer ein Formular

const IS_PROD = process.env.NODE_ENV === 'production'

// Loud warning on module load so Vercel deploy logs flag a missing Turnstile
// key in production. We don't throw — that would break cold starts and is
// hard to diagnose. At runtime, requests will be rejected 403 anyway.
if (IS_PROD && !process.env.TURNSTILE_SECRET_KEY) {
  console.error(
    '[Contact] TURNSTILE_SECRET_KEY not set in production — contact form will reject all submissions (fail-closed).',
  )
}

function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip)
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  if (rateLimit.size > 100) cleanupExpiredEntries()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count >= RATE_LIMIT_MAX
}

/**
 * Verify a Cloudflare Turnstile token.
 *
 * Fail-mode depends on NODE_ENV:
 *  - Production: fail-closed. Missing secret, network error, non-200, or
 *    `success: false` → rejected. This enforces bot protection even if
 *    Cloudflare is transiently unreachable.
 *  - Development: fail-open for missing secret and network errors so local
 *    contact-form testing works without a Cloudflare account.
 */
async function verifyTurnstile(token: string): Promise<{ ok: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: !IS_PROD }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      console.error('[Contact] Turnstile verify returned non-200:', res.status)
      return { ok: !IS_PROD }
    }
    const data = (await res.json()) as { success: boolean }
    return { ok: data.success }
  } catch (err) {
    console.error('[Contact] Turnstile verify error:', err)
    return { ok: !IS_PROD }
  }
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es in 15 Minuten erneut.' },
      { status: 429 }
    )
  }

  interface ContactBody {
    name?: unknown
    email?: unknown
    message?: unknown
    adapterNr?: unknown
    phone?: unknown
    honeypot?: unknown
    formLoadedAt?: unknown
    turnstileToken?: unknown
  }

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const { name, email, message, adapterNr, phone, honeypot, formLoadedAt, turnstileToken } = body

  // Honeypot — bots fill hidden fields
  if (honeypot) {
    return NextResponse.json({ success: true })
  }

  // Time-based bot signal — log suspicious fast submissions but don't block
  // (client-side timestamp is spoofable, autofill can trigger false positives)
  let isSuspiciouslyFast = false
  if (formLoadedAt && typeof formLoadedAt === 'number') {
    const elapsed = Date.now() - formLoadedAt
    isSuspiciouslyFast = elapsed < MIN_SUBMISSION_TIME_MS
  }

  // Cloudflare Turnstile verification.
  // In production, always require a valid token — even if TURNSTILE_SECRET_KEY
  // is not set (fail-closed). In dev, only verify when the key is configured.
  const needVerify = IS_PROD || !!process.env.TURNSTILE_SECRET_KEY
  if (needVerify) {
    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return NextResponse.json({ error: 'Bot-Schutz-Verifizierung fehlt. Bitte laden Sie die Seite neu.' }, { status: 403 })
    }
    const { ok } = await verifyTurnstile(turnstileToken)
    if (!ok) {
      return NextResponse.json({ error: 'Bot-Schutz-Verifizierung fehlgeschlagen.' }, { status: 403 })
    }
  }

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Bitte geben Sie Ihren Namen ein.' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ error: 'Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen).' }, { status: 400 })
  }

  const safeName = sanitize(name)
  const safeEmail = sanitize(email)
  const safeMessage = sanitize(message)
  const safeAdapter = adapterNr ? sanitize(String(adapterNr)) : ''
  const safePhone = phone ? sanitize(String(phone)) : ''

  // Check if Resend is configured
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL_TO ?? 'support@vcds.de'

  // Save to CMS
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: safeName, email: safeEmail, phone: safePhone, adapterNr: safeAdapter,
        message: isSuspiciouslyFast ? `[FAST SUBMIT] ${safeMessage}` : safeMessage,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[Contact] CMS-Speicherung fehlgeschlagen:', err)
  }

  if (!apiKey) {
    // DSGVO: personenbezogene Daten NICHT ins Log schreiben. Der Eintrag wurde
    // bereits oben im CMS gespeichert, sodass keine Nachricht verloren geht.
    console.warn('[Contact] RESEND_API_KEY nicht konfiguriert — Nachricht im CMS gespeichert, keine E-Mail versendet.')
    return NextResponse.json({ success: true })
  }

  // Send email via Resend
  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: `VCDS.de Kontakt <noreply@${process.env.RESEND_DOMAIN ?? 'vcds.de'}>`,
      to: [toEmail],
      replyTo: safeEmail,
      subject: `Kontaktanfrage von ${safeName}${safeAdapter ? ` (${safeAdapter})` : ''}`,
      text: [
        `Name: ${safeName}`,
        `E-Mail: ${safeEmail}`,
        safePhone ? `Telefon: ${safePhone}` : '',
        safeAdapter ? `Adapter-Nr: ${safeAdapter}` : '',
        '',
        '--- Nachricht ---',
        safeMessage,
      ].filter(Boolean).join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact] E-Mail-Versand fehlgeschlagen:', err)
    return NextResponse.json(
      { error: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
