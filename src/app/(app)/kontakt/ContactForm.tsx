'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/Icon'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [formLoadedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)

  function resetTurnstile() {
    setTurnstileToken(null)
    const turnstile = (window as unknown as Record<string, unknown>).turnstile as {
      reset: (el: HTMLElement | null) => void
    } | undefined
    if (turnstile && turnstileRef.current) {
      turnstile.reset(turnstileRef.current)
    }
  }

  // Load Turnstile script and render widget (only if site key is configured)
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
    script.async = true

    // Graceful degradation: if script fails to load, allow form submission without Turnstile
    script.onerror = () => setTurnstileError(true)
    const timeout = setTimeout(() => setTurnstileError(true), 10000)

    ;(window as unknown as Record<string, unknown>).onTurnstileLoad = () => {
      clearTimeout(timeout)
      const turnstile = (window as unknown as Record<string, unknown>).turnstile as {
        render: (el: HTMLElement, opts: Record<string, unknown>) => void
      } | undefined
      if (turnstile && turnstileRef.current) {
        turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          theme: 'light',
          language: 'de',
        })
      }
    }

    document.head.appendChild(script)
    return () => { clearTimeout(timeout); script.remove() }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          adapterNr: data.get('adapterNr'),
          phone: data.get('phone'),
          message: data.get('message'),
          honeypot: data.get('website'),
          formLoadedAt,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Fehler beim Senden.')
      }

      setStatus('success')
      form.reset()
      if (TURNSTILE_SITE_KEY) resetTurnstile()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
      if (TURNSTILE_SITE_KEY) resetTurnstile()
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" role="status">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="check" size={24} className="text-green-600" />
        </div>
        <h3 className="font-bold text-green-900 text-lg mb-2">Nachricht gesendet!</h3>
        <p className="text-sm text-green-700 mb-2">Vielen Dank. Wir melden uns schnellstmöglich bei Ihnen.</p>
        <p className="text-xs text-green-600">E-Mails werden Mo–Fr bis 17:00 Uhr bearbeitet.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 font-semibold hover:underline"
        >
          Neue Nachricht senden
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from users, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">Name <span aria-hidden="true">*</span></label>
        <input id="contact-name" type="text" name="name" required aria-required="true" minLength={2}
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          placeholder="Ihr Name" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">E-Mail <span aria-hidden="true">*</span></label>
        <input id="contact-email" type="email" name="email" required aria-required="true"
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          placeholder="ihre@email.de" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-adapter" className="block text-sm font-medium text-slate-700 mb-1.5">Adapter-Nr</label>
          <input id="contact-adapter" type="text" name="adapterNr"
            className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            placeholder="z.B. HEX-V2-12345" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label>
          <input id="contact-phone" type="tel" name="phone"
            className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            placeholder="+49 ..." />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" required aria-required="true" minLength={10} rows={4}
          aria-describedby={status === 'error' ? 'contact-error' : undefined}
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-y"
          placeholder="Ihre Nachricht..." />
      </div>

      {status === 'error' && (
        <div id="contact-error" role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
          <Icon name="warning" size={16} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Cloudflare Turnstile — only rendered if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="mb-4" />}

      <Button type="submit" variant="secondary" disabled={status === 'loading' || (!!TURNSTILE_SITE_KEY && !turnstileToken && !turnstileError)} className="min-h-[48px]">
        {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
      </Button>
    </form>
  )
}
