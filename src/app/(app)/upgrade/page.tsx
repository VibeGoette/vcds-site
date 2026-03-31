import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upgrades',
  description: 'VCDS Interface upgraden: 3 auf 10 FIN, 10 auf Unlimited, Hardware-Upgrade. Meist innerhalb von 24h bearbeitet.',
}

const upgrades = [
  { from: '3 VIN', to: '10 VIN', desc: 'Erweitern Sie Ihr HEX-V2 von 3 auf 10 Fahrzeuge. Ideal wenn die Familienflotte waechst.' },
  { from: '10 VIN', to: 'Unlimited', desc: 'Keine Einschraenkung mehr. Perfekt fuer den Einstieg in die professionelle Diagnose.' },
  { from: '3 VIN', to: 'Unlimited', desc: 'Direkt vom Hobby- zum Profi-Modell. Unbegrenzte Fahrzeuge, voller Funktionsumfang.' },
  { from: 'HEX-CAN', to: 'HEX-V2 / NET', desc: 'Hardware-Upgrade von aelteren Adaptern auf die aktuelle Generation. Neue Fahrzeuge, schnellerer Auto-Scan.' },
]

export default function Upgrade() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-slate-400 mb-3">Start / Upgrade</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">VCDS Upgrades</h1>
            <p className="text-slate-300 max-w-xl">Erweitern Sie Ihr bestehendes VCDS Interface. FIN-Erweiterungen und Hardware-Upgrades — meist innerhalb von 24 Stunden bearbeitet.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 py-12 space-y-12">
          {/* Upgrade Options */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Upgrade-Optionen</h2>
            <div className="space-y-3">
              {upgrades.map(function(u) {
                return (
                  <div key={u.from + u.to} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600">{u.from}</span>
                      <Icon name="arrow" size={16} className="text-blue-500" />
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200">{u.to}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{u.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">So funktioniert das Upgrade</h2>
            <div className="space-y-3">
              {[
                { t: 'Upgrade bestellen', d: 'Waehlen Sie das passende Upgrade im Auto-Intern Shop aus und schliessen Sie die Bestellung ab.' },
                { t: 'Adapter-Nummer mitteilen', d: 'Sie erhalten eine E-Mail mit der Bitte, Ihre Adapter-Seriennummer mitzuteilen.' },
                { t: 'Freischaltung', d: 'Unser Team schaltet Ihr Interface innerhalb von 24 Stunden frei. Meist deutlich schneller.' },
                { t: 'Fertig', d: 'Verbinden Sie den Adapter erneut mit Ihrem PC. Die neue Lizenz wird automatisch erkannt.' },
              ].map(function(s, i) {
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{s.t}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-6 border-t border-slate-200 space-y-4">
            <a href="https://www.auto-intern.de/shop/upgrades-erweiterungsmodule/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors text-lg">
              Upgrades im Shop ansehen <Icon name="arrow" size={18} className="text-white" />
            </a>
            <p className="text-sm text-slate-500">
              Fragen? <a href="tel:+4923458545800" className="text-blue-600 font-semibold hover:underline">+49 (0) 234 58 545 800</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
