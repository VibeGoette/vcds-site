import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import { Card } from '@/components/ui/Card'
import { LiveChatStatus } from './LiveChatStatus'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('fernwartung', {
  title: 'Fernwartung',
  description: 'VCDS Fernwartung: AnyDesk herunterladen, Adresse mitteilen, Support-Mitarbeiter hilft direkt auf Ihrem Bildschirm. LiveChat verfügbar Mo–Fr 9–16 Uhr.',
})
}

const anydeskSteps = [
  {
    title: 'AnyDesk herunterladen',
    desc: 'Laden Sie unseren vorbereiteten AnyDesk-Client herunter. Keine Installation nötig — das Programm startet direkt nach dem Entpacken.',
    icon: 'download',
    detail: 'Datei: AnyDesk_VCDSde_Client.zip (~3 MB)',
  },
  {
    title: 'Programm starten',
    desc: 'Doppelklicken Sie auf die entpackte .exe Datei. Windows fragt möglicherweise nach einer Bestätigung — klicken Sie auf "Trotzdem ausführen".',
    icon: 'bolt',
    detail: 'Tipp: Rechtsklick → "Als Administrator ausführen" wenn Probleme auftreten.',
  },
  {
    title: 'Ihre Adresse mitteilen',
    desc: 'Im AnyDesk-Fenster sehen Sie unter "Ihre Adresse" eine 9-stellige Nummer. Teilen Sie diese per Telefon oder LiveChat unserem Techniker mit.',
    icon: 'shield',
    detail: 'Format: XXX XXX XXX — die Nummer ändert sich bei jedem Start.',
  },
  {
    title: 'Verbindung annehmen',
    desc: 'Ein Fenster erscheint mit einer Verbindungsanfrage. Prüfen Sie, dass die Anfrage von einem VCDS.de Mitarbeiter kommt, dann klicken Sie "Akzeptieren".',
    icon: 'check',
    detail: 'Ihr Techniker kann jetzt Ihren Bildschirm sehen und Ihnen direkt helfen.',
  },
]

export default function Fernwartung() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Fernwartung"
          title="Fernwartung"
          description="Remote-Support via AnyDesk — unser Techniker hilft Ihnen direkt auf Ihrem Bildschirm."
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-12">
          {/* Two-column layout: Steps + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">

            {/* ═══ LEFT: AnyDesk Steps ═══ */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">So funktioniert die Fernwartung</h2>

              {/* Security notice */}
              <InfoBox variant="warning" title="Sicherheitshinweis">
                Akzeptieren Sie eine Verbindung <strong>ausschließlich</strong>, wenn Sie zuvor mit einem Mitarbeiter der Auto-Intern GmbH
                telefoniert oder gechattet haben und dieser die Fernwartung angekündigt hat. Wir fragen niemals unaufgefordert nach Zugang.
              </InfoBox>

              {/* Steps */}
              <div className="space-y-3">
                {anydeskSteps.map((s, i) => (
                  <div key={i} className="group flex gap-4 items-start bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      {i < anydeskSteps.length - 1 && (
                        <div className="absolute top-11 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-200 hidden sm:block" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{s.title}</h3>
                        <Icon name={s.icon} size={14} className="text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                      <p className="text-xs text-slate-400 mt-2 font-medium">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href="https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors text-base shadow-sm shadow-blue-200"
                >
                  <Icon name="download" size={20} />
                  AnyDesk herunterladen
                </a>
                <span className="text-xs text-slate-400">ZIP-Datei · ~3 MB · Keine Installation nötig</span>
              </div>

              {/* AnyDesk Info */}
              <InfoBox variant="info" title="Was ist AnyDesk?">
                AnyDesk ist eine sichere Fernwartungssoftware, die eine verschlüsselte Verbindung zwischen Ihrem Computer und unserem Techniker herstellt.
                Ihr Techniker sieht Ihren Bildschirm und kann — mit Ihrer Erlaubnis — Einstellungen vornehmen.
                Sie können die Verbindung jederzeit trennen.
              </InfoBox>
            </div>

            {/* ═══ RIGHT: Sidebar ═══ */}
            <aside className="space-y-5">
              {/* LiveChat Status */}
              <LiveChatStatus />

              {/* Phone Support */}
              <Card variant="muted">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon name="phone" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Telefon-Support</h3>
                    <p className="text-xs text-slate-500">Mo–Fr 9:00–16:00 Uhr</p>
                  </div>
                </div>
                <a
                  href="tel:+4923458545800"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <Icon name="phone" size={14} />
                  +49 (0) 234 58 545 800
                </a>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Bitte halten Sie Ihre VCDS-Seriennummer bereit.
                </p>
              </Card>

              {/* E-Mail Support */}
              <Card variant="muted">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon name="mail" size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">E-Mail Support</h3>
                    <p className="text-xs text-slate-500">Antwort innerhalb 24h</p>
                  </div>
                </div>
                <a
                  href="mailto:support@vcds.de"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <Icon name="mail" size={14} />
                  support@vcds.de
                </a>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Am besten mit Auto-Scan im Anhang.
                </p>
              </Card>

              {/* Requirements */}
              <Card>
                <h3 className="font-bold text-slate-900 text-sm mb-3">Voraussetzungen</h3>
                <ul className="space-y-2">
                  {[
                    'Windows PC (7, 8, 10, 11)',
                    'Internetverbindung',
                    'VCDS Interface angeschlossen',
                    'Fahrzeug verbunden + Zündung an',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <Icon name="check" size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
