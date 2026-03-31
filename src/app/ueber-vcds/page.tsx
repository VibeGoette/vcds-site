import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Über VCDS', description: 'VCDS von Ross-Tech: 32.445 Fehlercodes, Auto-Scan, Codierung für VW, Audi, Skoda, Seat.' }

export default function UeberVCDS() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto"><p className="text-xs text-slate-400 mb-3">Start / Über VCDS</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Über VCDS</h1>
            <p className="text-slate-300 max-w-xl">Mit Ross-Tech VCDS greifen Sie sicher und schnell auf die Diagnosedaten der Steuergeräte Ihres Fahrzeugs zu. Vertrieben durch die Auto-Intern GmbH in Bochum.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 py-12 space-y-16">
          <section>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"><Icon name="search" size={24} className="text-white" /></div>
              <div><p className="text-3xl font-bold text-blue-600">32.445</p><p className="text-sm text-blue-800">Fehlercodes werden aktuell im Klartext unterstützt. Auch die neuesten Fahrzeuge bis Modelljahr 2025.</p></div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Warum VCDS?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Ein neues Diagnosegerät zu kaufen kann eine schwere Entscheidung sein — muss es aber nicht. VCDS bietet Ihnen einen riesigen Funktionsumfang, mit dem Sie viele Diagnosearbeiten an Ihrem Fahrzeug schnell und einfach durchführen können.</p>
            <p className="text-slate-600 leading-relaxed">Im Preis-Leistungsverhältnis setzt sich VCDS gegenüber seinen hochwertigen Konkurrenten durch. Updates des Systems sind kostenlos. Mit dem Kauf bei der Auto-Intern GmbH erhalten Sie außerdem kostenlosen Support.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">HEX-V2 vs HEX-NET</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {name:'HEX-V2',ic:'usb',feats:['Neue Status-LEDs','Mehrplatzfähig','Verbesserter USB/OBD2','32-Bit Prozessor','Ab 294 €'],sub:'3 VIN · 10 VIN · Unlimited'},
                {name:'HEX-NET',ic:'wifi',feats:['WLAN Auto-Scans','Messwerte bei Fahrt','USB B Schraubsicherung','Ab Baujahr 2017','Ab 514 €'],sub:'10 VIN · Unlimited'},
              ].map(p => (
                <div key={p.name} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><Icon name={p.ic} size={18} className="text-blue-600" /></div>
                    <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                  </div>
                  <div className="space-y-2 mb-3">{p.feats.map(f => <div key={f} className="flex gap-2 text-sm text-slate-600"><Icon name="check" size={14} className="text-blue-500 shrink-0 mt-0.5" />{f}</div>)}</div>
                  <p className="text-xs text-slate-400">Lizenzmodelle: {p.sub}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">FIN & Lizenzmodelle</h2>
            <p className="text-slate-600 leading-relaxed mb-6">Die Fahrzeugidentifikationsnummer (FIN) dient zur eindeutigen Identifikation. Sie können aus drei Lizenzmodellen wählen — die Software und Bauweise unterscheiden sich nicht.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><Icon name="shield" size={16} className="text-green-600" /><h3 className="font-bold text-green-900 text-sm">Keine FIN belegt</h3></div>
                <p className="text-sm text-green-800">Fehlerspeicher löschen, Auto-Scan erstellen — unbegrenzt viele Fahrzeuge, egal welches Lizenzmodell.</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><Icon name="warning" size={16} className="text-amber-600" /><h3 className="font-bold text-amber-900 text-sm">FIN wird belegt</h3></div>
                <p className="text-sm text-amber-800">Codierung, Anpassungen, Grundeinstellungen, Gateway-Verbauliste, Zugriffsberechtigungen, Stellglied-Diagnosen.</p>
              </div>
            </div>
          </section>

          <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <div className="flex gap-3">
              <Icon name="warning" size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-red-900 mb-2">Vorsicht vor Fälschungen!</h2>
                <p className="text-sm text-red-800 leading-relaxed">Der Internet-Markt ist voll mit gefälschten Interfaces. Kaufen Sie nur bei autorisierten Händlern wie der Auto-Intern GmbH. Bei Unsicherheit senden Sie Fotos an info@vcds.de.</p>
              </div>
            </div>
          </section>

          <div className="text-center pt-4">
            <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors text-lg">
              Im Auto-Intern Shop bestellen <Icon name="arrow" size={18} className="text-white" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
