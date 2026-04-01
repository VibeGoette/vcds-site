import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaufberatung – Welches VCDS ist das richtige?',
  description: 'HEX-V2 vs HEX-NET: Preise, Funktionen, FIN-Verbrauch, SFD-Status und Empfehlung. Welches VCDS Interface passt zu Ihnen?',
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Warum VCDS?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              VCDS bietet unbegrenzte Basisfunktionen, einmalige Kosten ohne Abo-Modell, intuitive Bedienung
              und regelmäßige Software-Updates. Grundlegende Diagnosen erfordern keine Internetverbindung.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Beide Adapter — HEX-V2 und HEX-NET — bieten den vollen Funktionsumfang der VCDS-Software.
              Der Unterschied liegt in der Verbindungsart und dem Lizenzmodell. Die Software selbst ist identisch.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Fragen Sie sich: Brauche ich kabelloses Arbeiten? Wie viele Fahrzeuge muss ich diagnostizieren?
              Die Antwort auf diese beiden Fragen bestimmt Ihre Wahl.
            </p>
          </section>

          {/* Preistabelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Preisübersicht</h2>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full text-xs sm:text-sm min-w-[540px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 pr-3 font-semibold text-slate-500">Produkt</th>
                    <th className="text-center py-3 px-3 font-semibold text-slate-500">Variante</th>
                    <th className="text-center py-3 px-3 font-semibold text-slate-500">FIN-Limit</th>
                    <th className="text-center py-3 px-3 font-bold text-slate-900">Preis</th>
                    <th className="text-center py-3 pl-3 font-semibold text-slate-500">Ideal für</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['HEX-V2', '3 FIN', '3 Fahrzeuge', '294 €', 'Hobbyisten'],
                    ['HEX-V2', '10 FIN', '10 Fahrzeuge', '364 €', 'Enthusiasten'],
                    ['HEX-V2', 'Unlimited', 'Unbegrenzt', '594 €', 'Werkstätten'],
                    ['HEX-NET', '10 FIN', '10 Fahrzeuge', '514 €', 'WLAN-Nutzer'],
                    ['HEX-NET', 'Unlimited', 'Unbegrenzt', '794 €', 'Profi-Werkstätten'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : ''}>
                      <td className="py-3 pr-3 font-medium text-slate-700">{row[0]}</td>
                      <td className="py-3 px-3 text-center text-slate-600">{row[1]}</td>
                      <td className="py-3 px-3 text-center text-slate-600">{row[2]}</td>
                      <td className="py-3 px-3 text-center font-bold text-blue-600">{row[3]}</td>
                      <td className="py-3 pl-3 text-center text-slate-500">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                    ['Einstiegspreis', 'ab 294 €', 'ab 514 €'],
                    ['Lizenzmodelle', '3 / 10 / Unlimited VIN', '10 / Unlimited VIN'],
                    ['Messwerte bei Fahrt', 'Nur mit langem Kabel', 'Kabellos möglich'],
                    ['Mehrplatzfähig', 'Ja', 'Ja'],
                    ['VCDS-Mobile App', 'Nein', 'Ja (Smartphone/Tablet)'],
                    ['Software-Updates', 'Kostenlos', 'Kostenlos'],
                    ['Telefon-Support', 'Inklusive', 'Inklusive'],
                    ['Forum + Wiki', 'Inklusive', 'Inklusive'],
                    ['Auto-Scan Geschwindigkeit', 'Schnell', 'Schnell'],
                    ['Ideal für', 'Hobby / Einzelfahrzeuge', 'Werkstatt / Profis'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : ''}>
                      <td className="py-3 pr-4 font-medium text-slate-700">{row[0]}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{row[1]}</td>
                      <td className="py-3 pl-4 text-center text-slate-600">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FIN-Verbrauch */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">FIN-Verbrauch erklärt</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              FIN (Fahrzeug-Identifizierungsnummer) Registrierung speichert die Fahrgestellnummer dauerhaft im Interface.
              Dies geschieht erst nach manueller Bestätigung beim ersten Zugriff auf ein neues Fahrzeug.
              <strong> Einmal registrierte FINs können nicht gelöscht werden.</strong>
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <h3 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
                  <Icon name="check" size={14} className="text-emerald-600" />
                  Ohne FIN-Verbrauch (unbegrenzt)
                </h3>
                <ul className="space-y-1 text-sm text-emerald-800">
                  <li>• Auto-Scan (Fehlerdiagnose)</li>
                  <li>• Fehlercodes lesen und löschen</li>
                  <li>• Messwertblöcke anzeigen</li>
                  <li>• Steuergeräte-Karte erstellen</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 text-sm mb-2 flex items-center gap-2">
                  <Icon name="warning" size={14} className="text-amber-600" />
                  Mit FIN-Verbrauch
                </h3>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• Codierungen / Anpassungen</li>
                  <li>• Grundeinstellungen</li>
                  <li>• Gateway-Verbauliste</li>
                  <li>• Zugriffsberechtigung / Login</li>
                  <li>• Stellglied-Diagnosen</li>
                  <li>• Serviceinterval-Reset</li>
                  <li>• Transportmodus deaktivieren</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Hinweis: Ältere Fahrzeuge (typischerweise vor 2002) speichern oft keine FINs in den Steuergeräten,
              was zu null Verbrauch führt. Upgrade von 3 auf 10 VIN oder Unlimited ist jederzeit möglich.
            </p>
          </section>

          {/* Lizenzmodelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Welches Lizenzmodell?</h2>
            <div className="space-y-3">
              {[
                { name: '3 VIN – Hobby', price: 'ab 294 € (nur HEX-V2)', desc: 'Für die Familienflotte. Bis zu drei Fahrzeuge auslesen, codieren und diagnostizieren. Ideal wenn Sie nur Ihre eigenen Autos warten.', icon: 'users' },
                { name: '10 VIN – Enthusiast', price: 'ab 364 € (V2) / ab 514 € (NET)', desc: 'Für den erfahrenen Hobbyschrauber. Bis zu zehn Fahrzeuge. Gut wenn Sie auch Freunden und Familie helfen. Zehn FINs sollten für den eigenen Fuhrpark langfristig reichen.', icon: 'users' },
                { name: 'Unlimited – Professional', price: 'ab 594 € (V2) / ab 794 € (NET)', desc: 'Für Werkstätten und Service-Dienstleister. Unbegrenzt viele Fahrzeuge. Keine Einschränkung. Die einzige Option für professionelle Werkstätten.', icon: 'shield' },
              ].map((v) => (
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
              ))}
            </div>
          </section>

          {/* Ältere Modelle */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ältere Interfaces</h2>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-700 mb-1">HEX+CAN-USB</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Veraltetes Modell. Unterstützt nur Fahrzeuge bis Modelljahr 2017. Keine Updates mehr verfügbar. Nicht empfohlen für Neukauf.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-700 mb-1">VCDS-Lite</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Nur für Fahrzeuge vor 2005. Keine CAN-Bus-Unterstützung. Historisches Produkt, nicht mehr im Verkauf.</p>
              </div>
            </div>
          </section>

          {/* SFD */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Was ist SFD?</h2>
            <InfoBox variant="warning" title="Schutz von Fahrzeugdiagnosen">
              <p className="mb-2">
                SFD (Schutz von Fahrzeugdiagnosen) ist eine neue Technologie in neueren VW-Fahrzeugen,
                die den Zugriff auf bestimmte Steuergeräte einschränkt.
              </p>
              <p className="mb-2">
                <strong>Aktueller Status:</strong> Ross-Tech arbeitet an der Unterstützung von SFD.
                VW wird voraussichtlich monatliche Abogebühren für den Zugang erheben — die genauen Kosten stehen noch nicht fest.
              </p>
              <p>
                Für die meisten Diagnose- und Codierungsarbeiten ist VCDS weiterhin uneingeschränkt
                nutzbar. Bei Fragen zum SFD-Status Ihres Fahrzeugs kontaktieren Sie unseren Support.
              </p>
            </InfoBox>
          </section>

          {/* Fälschungswarnung */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Vorsicht vor Fälschungen</h2>
            <InfoBox variant="danger" title="Gefälschte VCDS-Interfaces erkennen">
              <p className="mb-2">
                Der Markt ist überschwemmt mit gefälschten VCDS-Interfaces, die oft zu Originalpreisen verkauft werden.
                Fälschungen können in der Regel keine Software-Updates erhalten und funktionieren nur mit modifizierten VCDS-Versionen.
              </p>
              <p className="mb-2">
                <strong>Erkennungsmerkmale:</strong> Aufkleber-Text, Schraubentyp und Gehäuse-Material können auf Fälschungen hinweisen.
                Senden Sie im Zweifelsfall Fotos an info@vcds.de zur Überprüfung.
              </p>
              <p>
                <strong>Kaufen Sie ausschließlich bei autorisierten Fachhändlern.</strong> Die Auto-Intern GmbH in Bochum
                ist der offizielle deutsche Vertriebspartner von Ross-Tech.
              </p>
            </InfoBox>
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
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Wenn Sie hauptsächlich in der Garage arbeiten, ein festes Budget haben und nicht mehr als 3-10 Fahrzeuge diagnostizieren. Stabile, kabelgebundene Diagnose zum besten Preis.</p>
                <p className="text-xs text-blue-700 font-semibold">Bestes Preis-Leistungs-Verhältnis</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="wifi" size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">HEX-NET</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Wenn Sie eine professionelle Werkstatt betreiben, Messwerte während der Fahrt aufnehmen, die VCDS-Mobile App nutzen oder kabellos arbeiten möchten.</p>
                <p className="text-xs text-blue-700 font-semibold">Must-Have für Werkstätten</p>
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
