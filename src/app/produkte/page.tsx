import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Produkte', description: 'VCDS Diagnoseadapter: HEX-V2 ab 294€, HEX-NET ab 514€. Komplettsysteme, Upgrades, Zubehör.' }

const cats = [
  { n:'HEX-NET', p:'ab 514 €', b:'WLAN', d:'Kabelloser Diagnoseadapter mit WLAN. 10 oder unbegrenzte Fahrzeuge.', ic:'wifi', url:'https://www.auto-intern.de/shop/diagnose-adapter/199/hex-net-wifi-inkl.-vcds-lizenz' },
  { n:'HEX-V2', p:'ab 294 €', b:'USB', d:'Kabelgebundener Adapter. 3, 10 oder unbegrenzte Fahrzeuge.', ic:'usb', url:'https://www.auto-intern.de/shop/diagnose-adapter/198/hex-v2-inkl.-vcds-lizenz' },
  { n:'Diagnose-Adapter', p:'', b:'', d:'Diverse Adapter mit Fehlercode-Auslesung und Messwertaufzeichnung.', ic:'plug', url:'https://auto-intern.de/shop/' },
  { n:'Komplettsysteme', p:'', b:'', d:'Komplettsets für professionelle Werkstätten.', ic:'shield', url:'https://auto-intern.de/shop/' },
  { n:'Upgrades', p:'', b:'', d:'Ältere Adapter auf den neuesten Standard upgraden.', ic:'bolt', url:'https://www.auto-intern.de/shop/upgrades-erweiterungsmodule/' },
  { n:'Zubehör', p:'', b:'', d:'Adapterkabel, Transportkoffer, USB-Sticks mit Software.', ic:'cog', url:'https://auto-intern.de/shop/' },
]

export default function Produkte() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto"><p className="text-xs text-slate-400 mb-3">Start / Produkte</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Produktübersicht</h1>
            <p className="text-slate-300 max-w-xl">Alle VCDS Diagnoseadapter im Überblick. Erhältlich im Auto-Intern Shop.</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[{ic:'search',t:'Präzise Diagnose',d:'Alle Steuergeräte auslesen'},{ic:'cog',t:'Einfache Codierung',d:'Funktionen freischalten'},{ic:'bolt',t:'Auto-Scan',d:'Komplett in Minuten'}].map(f => (
              <div key={f.t} className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4"><Icon name={f.ic} size={22} className="text-blue-600" /></div>
                <h3 className="font-bold text-slate-900 mb-1">{f.t}</h3>
                <p className="text-sm text-slate-500">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {cats.map(c => (
              <div key={c.n} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-blue-200 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Icon name={c.ic} size={20} className="text-blue-600" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-900">{c.n}</h3>
                    {c.b && <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">{c.b}</span>}
                  </div>
                  <p className="text-sm text-slate-500">{c.d}</p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  {c.p && <span className="font-bold text-blue-600">{c.p}</span>}
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-500 transition-colors whitespace-nowrap">
                    Zum Shop
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">Alle Produkte erhältlich unter auto-intern.de/shop</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
