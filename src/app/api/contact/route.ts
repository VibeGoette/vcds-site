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

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // Turnstile not configured — skip verification
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json() as { success: boolean }
    return data.success
  } catch {
    return true // On verification error, allow submission (fail open)
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

  // Time-based bot detection — form submitted faster than a human can type
  if (formLoadedAt && typeof formLoadedAt === 'number') {
    const elapsed = Date.now() - formLoadedAt
    if (elapsed < MIN_SUBMISSION_TIME_MS) {
      return NextResponse.json({ success: true }) // Silent reject for bots
    }
  }

  // Cloudflare Turnstile verification (optional — only if configured)
  if (process.env.TURNSTILE_SECRET_KEY && turnstileToken && typeof turnstileToken === 'string') {
    const valid = await verifyTurnstile(turnstileToken)
    if (!valid) {
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
      data: { name: safeName, email: safeEmail, phone: safePhone, adapterNr: safeAdapter, message: safeMessage, submittedAt: new Date().toISOString() },
    })
  } catch (err) {
    console.error('[Contact] CMS-Speicherung fehlgeschlagen:', err)
  }

  if (!apiKey) {
    console.warn('[Contact] RESEND_API_KEY nicht konfiguriert. Nachricht geloggt:')
    console.log({ name: safeName, email: safeEmail, message: safeMessage, adapterNr: safeAdapter, phone: safePhone })
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
