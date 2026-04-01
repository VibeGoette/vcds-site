'use client'

import { Button } from '@/components/ui/Button'

export function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Kontaktformular wird nach CMS-Anbindung aktiv.') }}>
      <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label><input type="text" className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Ihr Name" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1.5">E-Mail *</label><input type="email" className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="ihre@email.de" /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Adapter-Nr</label><input type="text" className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="z.B. HEX-V2-12345" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label><input type="tel" className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="+49 ..." /></div>
      </div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht *</label><textarea rows={4} className="w-full px-4 py-3 border min-h-[48px] border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-y" placeholder="Ihre Nachricht..." /></div>
      <Button type="submit" variant="secondary">Nachricht senden</Button>
    </form>
  )
}
