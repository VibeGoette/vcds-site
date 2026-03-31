'use client'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { FAQSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'

const faqs = [
  { q:'Für welche Fahrzeugmarken ist VCDS geeignet?', a:'VW, Audi, SEAT, Škoda, Bentley, Bugatti, Lamborghini und einige Porsche-Modelle.' },
  { q:'Welche Folgekosten habe ich nach dem Kauf?', a:'Keine. Updates innerhalb der gleichen Hauptversion sind kostenlos.' },
  { q:'Kann ich VCDS auf meinem Mac nutzen?', a:'VCDS ist Windows-basiert. Über Boot Camp oder Parallels möglich, aber ohne Garantie.' },
  { q:'Was ist der Unterschied zu einem OBD-II-Scan-Tool?', a:'OBD-II erreicht nur den Motor. VCDS nutzt das proprietäre VW-Protokoll und kommuniziert mit allen Steuergeräten: ABS, Airbags, Radio, Klimaanlage, Gateway und vieles mehr.' },
  { q:'Unterstützt VCDS auch Elektrofahrzeuge?', a:'Ja, viele Elektrofahrzeuge innerhalb der Volkswagen-Gruppe werden unterstützt.' },
  { q:'Wie konfiguriere ich das HEX-NET WiFi?', a:'Im Access-Point-Modus verbinden (LED orange), dann 192.168.0.1 im Browser öffnen. Standard-Passwort: password. Nur 2.4 GHz.' },
  { q:'Kann das HEX-NET dauerhaft im Auto bleiben?', a:'Ja, mit korrekt konfiguriertem Energiesparmodus. Prüfen Sie, ob das HEX-NET bei ausgeschalteter Zündung in den Schlafmodus wechselt.' },
  { q:'Wo kaufe ich ein originales VCDS Interface?', a:'Ausschließlich bei autorisierten Fachhändlern. Die Auto-Intern GmbH ist der offizielle Vertriebspartner von Ross-Tech in Deutschland. Shop: auto-intern.de/shop' },
  { q:'Kann VCDS den Kilometerzähler zurücksetzen?', a:'Nein. Einzige Ausnahme: Ein brandneues Kombiinstrument unter 100 km kann einmalig erhöht werden.' },
  { q:'Wie ist VCDS beim Thema SFD aufgestellt?', a:'SFD (Schutz von Fahrzeugdiagnosen) ist eine Technologie in neueren VW-Fahrzeugen. VCDS hat Funktionen implementiert, um mit SFD-geschützten Fahrzeugen zu arbeiten.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <>
      <FAQSchema items={faqs} />
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto"><p className="text-xs text-slate-400 mb-3">Start / FAQ</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">FAQ — Häufig gestellte Fragen</h1>
            <p className="text-slate-300 max-w-xl">Antworten zu VCDS, HEX-V2, HEX-NET, Kompatibilität und Installation.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 py-12">
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-slate-100 last:border-0">
                <button onClick={() => setOpen(open === i ? null : i)}
                  aria-label={`Frage ${f.q} ${open === i ? 'schließen' : 'öffnen'}`}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-4 sm:py-5 text-left min-h-[48px] text-[15px] font-semibold transition-colors ${open === i ? 'bg-blue-50/50 text-slate-900' : 'text-slate-700 hover:bg-slate-50/50'}`}>
                  <span>{f.q}</span>
                  <span className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}>
                    <Icon name="chevron" size={16} className="text-slate-400" />
                  </span>
                </button>
                {open === i && <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="chat" size={22} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Ihre Frage ist nicht dabei?</h2>
            <p className="text-sm text-slate-600 mb-5">Unser Support-Team der Auto-Intern GmbH hilft Ihnen gerne weiter.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/kontakt" className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-500 transition-colors">Kontakt aufnehmen</a>
              <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-blue-200 text-blue-600 rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors">Im Forum fragen</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
