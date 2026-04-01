import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaufberatung – Welches VCDS ist das richtige?',
  description: 'HEX-V2 vs HEX-NET: Preise, Funktionen, SFD-Status und Empfehlung. Welches VCDS Interface passt zu Ihnen?',
}

export default function Kaufberatung() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero breadcrumb="Start / Kaufberatung" title="Kaufberatung" description="Welches VCDS Interface ist das richtige? Hier finden Sie alle Informationen, um eine fundierte Kaufentscheidung zu treffen." />

        <div className="max-w-3xl mx-auto px-5 py-12 space-y-14">
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Die wichtigste Frage zuerst</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Beide Adapter — HEX-V2 und HEX-NET — bieten den vollen Funktionsumfang der VCDS-Software.
              Der Unterschied liegt in der Verbindungsart und dem Lizenzmodell. Die Software selbst ist identisch.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Fragen Sie sich: Brauche ich kabelloses Arbeiten? Wie viele Fahrzeuge muss ich diagnostizieren?
              Die Antwort auf diese beiden Fragen bestimmt Ihre Wahl.
            </p>
          </section>

          {/* Vergleichstabelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">HEX-V2 vs HEX-NET im Vergleich</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 pr-4 font-semibold text-slate-500">Eigenschaft</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="usb" size={16} className="text-blue-600" />HEX-V2
                      </div>
                    </th>
                    <th className="text-center py-3 pl-4 font-bold text-slate-900">
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="wifi" size={16} className="text-blue-600" />HEX-NET
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Verbindung', 'USB (kabelgebunden)', 'WLAN + USB'],
                    ['Einstiegspreis', 'ab 294 \u20AC', 'ab 514 \u20AC'],
                    ['Lizenzmodelle', '3 / 10 / Unlimited VIN', '10 / Unlimited VIN'],
                    ['Messwerte bei Fahrt', 'Nur mit langem Kabel', 'Kabellos moeglich'],
                    ['Mehrplatzfaehig', 'Ja', 'Ja'],
                    ['Software-Updates', 'Kostenlos', 'Kostenlos'],
                    ['Telefon-Support', 'Inklusive', 'Inklusive'],
                    ['Forum + Wiki', 'Inklusive', 'Inklusive'],
                    ['Auto-Scan Geschwindigkeit', 'Schnell', 'Schnell'],
                    ['Ideal fuer', 'Hobby / Einzelfahrzeuge', 'Werkstatt / Profis'],
                  ].map(function(row, i) {
                    return (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : ''}>
                        <td className="py-3 pr-4 font-medium text-slate-700">{row[0]}</td>
                        <td className="py-3 px-4 text-center text-slate-600">{row[1]}</td>
                        <td className="py-3 pl-4 text-center text-slate-600">{row[2]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Lizenzmodelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Welches Lizenzmodell?</h2>
            <div className="space-y-3">
              {[
                { name: '3 VIN \u2013 Hobby', price: 'ab 294 \u20AC (nur HEX-V2)', desc: 'Fuer die Familienflotte. Bis zu drei Fahrzeuge auslesen, codieren und diagnostizieren. Ideal wenn Sie nur Ihre eigenen Autos warten.', icon: 'users' },
                { name: '10 VIN \u2013 Enthusiast', price: 'ab 374 \u20AC (V2) / ab 514 \u20AC (NET)', desc: 'Fuer den erfahrenen Hobbyschrauber. Bis zu zehn Fahrzeuge. Gut wenn Sie auch Freunden und Familie helfen.', icon: 'users' },
                { name: 'Unlimited \u2013 Professional', price: 'ab 474 \u20AC (V2) / ab 614 \u20AC (NET)', desc: 'Fuer Werkstaetten und Service-Dienstleister. Unbegrenzt viele Fahrzeuge. Keine Einschraenkung.', icon: 'shield' },
              ].map(function(v) {
                return (
                  <div key={v.name} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon name={v.icon} size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 mb-1">
                          <h3 className="font-bold text-slate-900">{v.name}</h3>
                          <span className="text-sm text-blue-600 font-semibold">{v.price}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* SFD */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Was ist SFD?</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <div className="flex gap-3">
                <Icon name="warning" size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 leading-relaxed mb-3">
                    SFD (Schutz von Fahrzeugdiagnosen) ist eine Technologie in neueren VW-Fahrzeugen,
                    die den Zugriff auf bestimmte Steuergeraete einschraenkt. VCDS hat Funktionen
                    implementiert, um mit SFD-geschuetzten Fahrzeugen zu arbeiten.
                  </p>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Fuer die meisten Diagnose- und Codierungsarbeiten ist VCDS weiterhin uneingeschraenkt
                    nutzbar. Bei Fragen zum SFD-Status Ihres Fahrzeugs kontaktieren Sie unseren Support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Empfehlung */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Unsere Empfehlung</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="usb" size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">HEX-V2</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Wenn Sie hauptsaechlich in der Garage arbeiten, ein festes Budget haben und nicht mehr als 3-10 Fahrzeuge diagnostizieren.</p>
                <p className="text-xs text-blue-700 font-semibold">Bestes Preis-Leistungs-Verhaeltnis</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="wifi" size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">HEX-NET</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Wenn Sie eine professionelle Werkstatt betreiben, Messwerte waehrend der Fahrt aufnehmen oder kabellos arbeiten moechten.</p>
                <p className="text-xs text-blue-700 font-semibold">Must-Have fuer Werkstaetten</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-6 border-t border-slate-200 space-y-4">
            <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors text-lg">
              Im Auto-Intern Shop bestellen <Icon name="arrow" size={18} className="text-white" />
            </a>
            <p className="text-sm text-slate-500">
              Noch unsicher? Rufen Sie uns an: <a href="tel:+4923458545800" className="text-blue-600 font-semibold hover:underline">+49 (0) 234 58 545 800</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
