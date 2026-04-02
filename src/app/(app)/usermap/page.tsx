import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VCDS User Map',
  description: 'Die VCDS.de User Map vernetzt Werkstätten, Diagnosetechniker und VCDS-Nutzer. Finden Sie Hilfe in Ihrer Nähe oder lassen Sie sich selbst eintragen.',
}

const benefits = [
  { icon: 'map', title: 'Sichtbarkeit', desc: 'Ihre Werkstatt oder Ihre Dienstleistungen werden für andere VCDS-Nutzer in Ihrer Region sichtbar.' },
  { icon: 'chat', title: 'Vernetzung', desc: 'Finden Sie den direkten Draht zu anderen Diagnosetechnikern und tauschen Sie Erfahrungen aus.' },
  { icon: 'shield', title: 'Vertrauen', desc: 'Gelistete Nutzer zeigen, dass sie aktiv mit VCDS arbeiten — ein Pluspunkt für Werkstätten und Dienstleister.' },
  { icon: 'bolt', title: 'Hilfe vor Ort', desc: 'Privatnutzer finden schnell jemanden in der Nähe, der bei Codierungen oder Diagnosen helfen kann.' },
]

export default function UserMap() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / VCDS User Map"
          title="VCDS User Map"
          description="Die VCDS.de User Map ist mehr als nur eine Karte — sie vernetzt die VCDS-Community. Werkstätten, Diagnosetechniker und Hobby-Schrauber finden hier den direkten Draht zueinander."
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-5 py-12 space-y-12">

          {/* Was ist die User Map */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Was ist die User Map?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Die VCDS User Map zeigt auf einer interaktiven Karte, wo sich VCDS-Nutzer befinden. Ob Werkstatt, freier Diagnosetechniker oder erfahrener Hobby-Schrauber — die Karte hilft dabei, Gleichgesinnte in der Nähe zu finden.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Besonders für Privatnutzer, die Hilfe bei einer Codierung oder Fehlerdiagnose suchen, ist die User Map ein wertvolles Werkzeug.
              Werkstätten und Dienstleister profitieren von der zusätzlichen Sichtbarkeit in der VCDS-Community.
            </p>
          </section>

          {/* Vorteile */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ihre Vorteile</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon name={b.icon} size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wie eintragen */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">So werden Sie eingetragen</h2>
            <div className="space-y-3">
              {[
                { step: 1, title: 'Forum-Konto erstellen', desc: 'Registrieren Sie sich kostenlos im VCDS.de Forum.' },
                { step: 2, title: 'Eintrag vornehmen', desc: 'Tragen Sie Ihren Standort und Ihre Dienstleistungen in der User Map des Forums ein.' },
                { step: 3, title: 'Sichtbar werden', desc: 'Ihr Eintrag wird auf der Karte veröffentlicht und ist für die gesamte Community sichtbar.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start bg-white border border-slate-200 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-0.5">{s.title}</h3>
                    <p className="text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InfoBox variant="info" title="Hinweis">
            Die User Map wird über das VCDS.de Forum verwaltet. Um sich eintragen zu lassen, benötigen Sie ein kostenloses Forum-Konto.
          </InfoBox>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://forum.vcds.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors text-base shadow-sm shadow-blue-200"
            >
              <Icon name="chat" size={20} />
              Zum VCDS Forum
            </a>
            <span className="text-xs text-slate-400">Kostenlose Registrierung · User Map im Forum</span>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
