'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/Icon'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
          honeypot: data.get('website'), // honeypot field
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Fehler beim Senden.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="check" size={24} className="text-green-600" />
        </div>
        <h3 className="font-bold text-green-900 text-lg mb-2">Nachricht gesendet!</h3>
        <p className="text-sm text-green-700 mb-4">Vielen Dank. Wir melden uns schnellstmöglich bei Ihnen.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-green-600 font-semibold hover:underline"
        >
          Neue Nachricht senden
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Honeypot — hidden from users, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
        <input type="text" name="name" required minLength={2}
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="Ihr Name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">E-Mail *</label>
        <input type="email" name="email" required
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="ihre@email.de" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Adapter-Nr</label>
          <input type="text" name="adapterNr"
            className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="z.B. HEX-V2-12345" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label>
          <input type="tel" name="phone"
            className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="+49 ..." />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht *</label>
        <textarea name="message" required minLength={10} rows={4}
          className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-y"
          placeholder="Ihre Nachricht..." />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
          <Icon name="warning" size={16} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <Button type="submit" variant="secondary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
      </Button>
    </form>
  )
}
