import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kontakt', description: 'VCDS Support: Mo–Fr 9–16 Uhr. Tel: +49 234 58 545 800. KFZ-Meister beraten Sie.' }

const team = [
  { name:'Nils', role:'VCDS Support', bio:'Spezialist für Umbauten, Codierungen und Retrofit. Aus der Community zum Team gestoßen.', motto:'Man kann nicht alles aus dem 255 wissen!' },
  { name:'Wolfgang', role:'VCDS Support · KFZ-Meister', bio:'Kaum jemand hat so viel Wissen und Sachverstand. Bevor ein Problem existiert, kennt Wolfgang die Lösung.', motto:'Es gibt kein schlechtes Wetter für Motorradfahren, nur falsche Ausstattung!' },
  { name:'Jürgen', role:'VCDS Support · KFZ-Meister', bio:'Oszilloskop-Experte. Seine Stärke: Wissen einfach und trotzdem umfangreich vermitteln.', motto:'Probleme sind wie dafür gemacht, dass mein Oszilloskop tätig wird!' },
]

export default function Kontakt() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto"><p className="text-xs text-slate-400 mb-3">Start / Kontakt</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Kontakt</h1>
            <p className="text-slate-300 max-w-xl">Das Team der Auto-Intern GmbH hilft Ihnen gerne weiter — per Telefon, E-Mail oder Chat.</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Kontaktformular</h2>
              <form className="space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Ihr Name" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">E-Mail *</label><input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="ihre@email.de" /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Adapter-Nr</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="z.B. HEX-V2-12345" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label><input type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="+49 ..." /></div>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht *</label><textarea rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-y" placeholder="Ihre Nachricht..." /></div>
                <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors">Nachricht senden</button>
              </form>
            </div>
            <aside className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Auto-Intern GmbH</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><Icon name="map" size={16} className="text-slate-400" /><span className="text-sm text-slate-600">Herner Str. 299, Geb. 29B, 44809 Bochum</span></div>
                  <div className="flex items-center gap-3"><Icon name="phone" size={16} className="text-slate-400" /><a href="tel:+4923458545800" className="text-sm text-blue-600 font-semibold hover:underline">+49 (0) 234 58 54 58 00</a></div>
                  <div className="flex items-center gap-3"><Icon name="mail" size={16} className="text-slate-400" /><span className="text-sm text-slate-600">support@vcds.de</span></div>
                  <div className="flex items-center gap-3"><Icon name="clock" size={16} className="text-slate-400" /><span className="text-sm text-slate-500">Mo–Fr: 09:00–16:00 Uhr</span></div>
                </div>
                <p className="text-xs text-slate-400 mt-4">Bei Supportanfragen bitte vor dem Anruf einen Auto-Scan per Mail schicken!</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-3">Selbst informieren</h3>
                <div className="space-y-2">
                  <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Icon name="chat" size={14} className="text-blue-400" />forum.vcds.de</a>
                  <a href="https://wiki.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Icon name="globe" size={14} className="text-blue-400" />wiki.vcds.de</a>
                  <a href="https://dechat.vcds.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Icon name="users" size={14} className="text-blue-400" />Telegram Community</a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="py-14 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Unser Team</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {team.map(m => (
                <div key={m.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Icon name="users" size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{m.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">{m.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{m.bio}</p>
                  <p className="text-sm text-slate-400 italic">{m.motto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
