import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 Minuten

function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip)
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  // Cleanup expired entries every 100 requests to prevent memory leak
  if (rateLimit.size > 100) cleanupExpiredEntries()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count >= RATE_LIMIT_MAX
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
  }

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const { name, email, message, adapterNr, phone, honeypot } = body

  // Honeypot — bots fill hidden fields
  if (honeypot) {
    // Silently accept to not reveal the trap
    return NextResponse.json({ success: true })
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
