import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Troubleshooting – Fehlerbehebung',
  description: 'VCDS Troubleshooting: Lösungen für Verbindungsprobleme, Registrierung, Treiber-Installation und häufige Fehlermeldungen.',
}

const sections = [
  {
    title: 'Registrierung & Aktivierung',
    icon: 'shield',
    problems: [
      {
        q: 'Ich habe keine Bestätigungsmail erhalten',
        a: 'Nach dem Absenden des Registrierungsformulars in VCDS kann es bis zu 20 Minuten dauern. Prüfen Sie auch Ihren Spam-Ordner. Falls nach 30 Minuten keine Mail angekommen ist, kontaktieren Sie unseren Support.',
      },
      {
        q: 'VCDS zeigt "Nicht registriert" an',
        a: 'Stellen Sie sicher, dass Ihr Interface am USB-Port angeschlossen und mit dem Fahrzeug verbunden ist. Die Registrierung wird erst nach einem erfolgreichen Verbindungstest auf dem Fahrzeug abgeschlossen.',
      },
      {
        q: 'Transaktions-ID kommt nicht',
        a: 'In den meisten Fällen kommt die Transaktions-ID innerhalb von 15 Minuten. Manchmal wird die Registrierung manuell seitens Ross-Tech geprüft — Sie erhalten dann eine entsprechende Info-Mail.',
      },
    ],
  },
  {
    title: 'Verbindungsprobleme',
    icon: 'plug',
    problems: [
      {
        q: 'VCDS findet kein Interface',
        a: 'Prüfen Sie: 1) USB-Kabel richtig eingesteckt, 2) Treiber korrekt installiert (Geräte-Manager → „Ross-Tech USB Interface"), 3) Anderer USB-Port probieren. Vermeiden Sie USB-Hubs.',
      },
      {
        q: 'Verbindung zum Steuergerät schlägt fehl',
        a: 'Stellen Sie sicher, dass die Zündung eingeschaltet ist (nicht nur Standlicht). Prüfen Sie den OBD-Stecker auf festen Sitz. Bei älteren Fahrzeugen kann ein direkter Anschluss an die Batterie helfen.',
      },
      {
        q: 'HEX-NET wird im WLAN nicht gefunden',
        a: 'Das HEX-NET eröffnet ein eigenes WLAN-Netzwerk. Verbinden Sie sich direkt mit dem Netzwerk „HEX-NET-..." auf Ihrem Laptop. Prüfen Sie, ob die blaue WLAN-LED am Interface blinkt.',
      },
    ],
  },
  {
    title: 'Installation & Treiber',
    icon: 'download',
    problems: [
      {
        q: 'Treiber-Installation schlägt unter Windows 11 fehl',
        a: 'Laden Sie den aktuellen USB-Treiber von unserer Download-Seite herunter. Führen Sie die Installation als Administrator aus (Rechtsklick → „Als Administrator ausführen").',
      },
      {
        q: 'VCDS startet nicht nach dem Update',
        a: 'Deinstallieren Sie die alte Version vollständig, starten Sie den PC neu und installieren Sie die neueste Version von unserer Download-Seite.',
      },
      {
        q: 'Windows Defender blockiert VCDS',
        a: 'VCDS ist signierte Software. Falls Windows Defender oder ein Virenscanner die Installation blockiert, fügen Sie eine Ausnahme für den VCDS-Ordner hinzu (Standard: C:\\Ross-Tech\\VCDS).',
      },
    ],
  },
  {
    title: 'Allgemeine Fehler',
    icon: 'search',
    problems: [
      {
        q: 'Fehlermeldung: "Can\'t Synch to controller"',
        a: 'Diese Meldung deutet auf ein Kommunikationsproblem hin. Prüfen Sie den OBD-Stecker, die Zündung und versuchen Sie es erneut. Bei anhaltenden Problemen nutzen Sie unsere Fernwartung.',
      },
      {
        q: 'Auto-Scan bricht ab',
        a: 'Ein Abbruch kann durch instabile Stromversorgung verursacht werden. Schließen Sie ggf. ein Ladegerät an die Fahrzeugbatterie an. Stellen Sie sicher, dass keine Verbraucher (Licht, Radio) aktiv sind.',
      },
      {
        q: 'Codierung wird nicht übernommen',
        a: 'Manche Steuergeräte erfordern einen Zugriffsberechtigungscode. Prüfen Sie, ob VCDS nach einem Code fragt. Nicht jede Codierung ist bei jedem Fahrzeug freigeschaltet — im Zweifel im Wiki nachschlagen.',
      },
    ],
  },
]

export default function Troubleshooting() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Troubleshooting"
          title="Troubleshooting"
          description="Lösungen für die häufigsten Probleme mit VCDS — von der Installation über Verbindungsfehler bis zu Registrierungsfragen."
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-5 py-12 space-y-12">

          {/* Quick Links */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sections.map((s) => (
              <a key={s.title} href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all text-center">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon name={s.icon} size={16} className="text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{s.title}</span>
              </a>
            ))}
          </nav>

          {/* Sections */}
          {sections.map((s) => (
            <section key={s.title} id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Icon name={s.icon} size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
              </div>
              <div className="space-y-3">
                {s.problems.map((p) => (
                  <details key={p.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden list-none">
                      <Icon name="cog" size={14} className="text-blue-500 shrink-0 group-open:rotate-90 transition-transform" />
                      <span className="font-semibold text-sm text-slate-900">{p.q}</span>
                    </summary>
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {p.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {/* Weiterführende Hilfe */}
          <InfoBox variant="info" title="Problem nicht gelöst?">
            Wenn Ihr Problem hier nicht aufgeführt ist, stehen Ihnen weitere Hilfsangebote zur Verfügung:
          </InfoBox>

          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/fernwartung" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon name="wifi" size={18} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Fernwartung</h3>
              <p className="text-xs text-slate-500">Remote-Support via AnyDesk</p>
            </a>
            <a href="/faq" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon name="chat" size={18} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">FAQ</h3>
              <p className="text-xs text-slate-500">Häufig gestellte Fragen</p>
            </a>
            <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon name="globe" size={18} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Forum</h3>
              <p className="text-xs text-slate-500">Community-Hilfe</p>
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
