import { Header } from '@/components/Header'
import { FAQSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { IconBox } from '@/components/ui/IconBox'
import { FAQAccordion } from './FAQAccordion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Häufig gestellte Fragen zu VCDS, HEX-V2, HEX-NET, Kompatibilität und Installation.',
}

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
  return (
    <>
      <FAQSchema items={faqs} />
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / FAQ"
          title="FAQ — Häufig gestellte Fragen"
          description="Antworten zu VCDS, HEX-V2, HEX-NET, Kompatibilität und Installation."
        />

        <div className="max-w-3xl mx-auto px-5 py-12">
          <Card padding="tight" className="overflow-hidden">
            <FAQAccordion items={faqs} />
          </Card>

          <Card variant="muted" className="mt-10 text-center bg-blue-50 border-blue-100 p-8">
            <IconBox icon="chat" shape="circle" size="lg" className="mx-auto mb-4 bg-blue-100" />
            <h2 className="text-lg font-bold text-slate-900 mb-2">Ihre Frage ist nicht dabei?</h2>
            <p className="text-sm text-slate-600 mb-5">Unser Support-Team der Auto-Intern GmbH hilft Ihnen gerne weiter.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" href="/kontakt">Kontakt aufnehmen</Button>
              <Button variant="outline" href="https://forum.vcds.de" external>Im Forum fragen</Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
