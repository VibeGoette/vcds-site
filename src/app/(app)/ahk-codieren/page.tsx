import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AHK Codieren – Anhängerkupplung freischalten',
  description: 'Übersicht aller Anleitungen zur Codierung einer nachgerüsteten Anhängerkupplung (AHK) mit VCDS — sortiert nach Fahrzeugplattform.',
}

const platforms = [
  {
    name: 'MQB',
    desc: 'Golf 7/8, Passat B8, Tiguan, T-Roc, Skoda Octavia III/IV, Seat Leon III/IV u.\u00a0v.\u00a0m.',
    href: 'https://wiki-online.vcds.de/de/Codierungen/MQB/Nachr%C3%BCstungen/AHK-Anh%C3%A4ngerkupplung',
    steps: ['STG19 – Gateway → Verbauliste → STG69 Anhänger aktivieren', 'STG69 – Codierung → Trailer Connector Diagnosis active', 'Zündung 10 Sek. aus, Fehler löschen'],
  },
  {
    name: 'MQB Evo',
    desc: 'Golf 8 (ab 2020), Tiguan II FL, Skoda Octavia IV, VW Caddy V u.\u00a0a.',
    href: 'https://wiki-online.vcds.de/de/Codierungen/MQBevo',
    steps: ['STG19 – Gateway → Verbauliste → STG69 hinzufügen', 'STG69 – Codierung anpassen', 'Fehler löschen & Zündung aus/ein'],
  },
  {
    name: 'MLB / MLBevo',
    desc: 'Audi A4 B8/B9, A5, A6 C7/C8, Q5, Q7 4M u.\u00a0a.',
    href: 'https://wiki-online.vcds.de/de/Codierungen/MLB/Anh%C3%A4ngerkupplung_(AHK)',
    steps: ['STG6C – Heckklappensteuerung → Codierung anpassen', 'STG6D – Heckklappe → Anhängererkennung verbaut', 'Bei Kameras: Byte 8 → Trailer information'],
  },
  {
    name: 'MEB',
    desc: 'VW ID.3, ID.4, ID.5, ID. Buzz — Elektrofahrzeuge',
    href: 'https://wiki.vcds.de/de/Codierungen/MEB/Anh%C3%A4ngerkupplung',
    steps: ['STG19 – Diagnoseinterface → Verbauliste → STG69 hinzufügen', 'Kein SFD notwendig bei ID Software v3.0+', 'Fehler löschen & Neustart'],
  },
  {
    name: 'PQ35 / PQ46',
    desc: 'Golf 5/6, Passat B6/B7, Touran, Tiguan I, Skoda Octavia II u.\u00a0a.',
    href: 'https://wiki-online.vcds.de/de/Plattformen/PQ46',
    steps: ['STG19 – Gateway → Verbauliste → STG69 aktivieren', 'STG69 – Codierung → Anhänger aktiv', 'Einparkhilfe ggf. anpassen'],
  },
  {
    name: 'A6 4F / Q7 4L',
    desc: 'Audi A6 (C6), Audi Q7 (4L) — ältere Plattform',
    href: 'https://wiki.vcds.de/de/Codierungen/A6_4F_Q7_4L/Anh%C3%A4ngerkupplung',
    steps: ['STG19 – Verbauliste → STG69 Anhängerelektronik', 'STG76 – Einparkhilfe → Codierung +1 AHK verbaut', 'Fehler löschen'],
  },
]

export default function AhkCodieren() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / AHK Codieren"
          title="Anhängerkupplung codieren"
          description="Übersicht der Anleitungen zum Freischalten einer nachgerüsteten Anhängerkupplung mit VCDS — sortiert nach Fahrzeugplattform."
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-5 py-12 space-y-10">

          <InfoBox variant="warning" title="Wichtiger Hinweis">
            Diese Anleitungen dienen als <strong>Orientierung</strong>. Einzelne Bits &amp; Bytes können je nach Modell, Baujahr und Ausstattung abweichen.
            Wählen Sie immer die Anleitung Ihrer <strong>passenden Plattform</strong>, um fahrzeugspezifische Informationen zu erhalten.
            Im Zweifel hilft unser <a href="https://forum.vcds.de/c/codierung-anpassung/21" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-amber-900">Forum</a>.
          </InfoBox>

          {/* Platform Grid */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Anleitungen nach Plattform</h2>
            <div className="grid gap-4">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                        <Icon name="globe" size={14} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-slate-500 mb-3">{p.desc}</p>
                      <ul className="space-y-1">
                        {p.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-50 text-blue-600 text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Icon name="cog" size={16} className="text-blue-600" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* PDF Download */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Icon name="download" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Allgemeine AHK-Anleitung (PDF)</h3>
                <p className="text-sm text-slate-600 mb-3">Kompakte Übersicht zur Codierung und Anpassung einer nachgerüsteten Anhängerkupplung — als PDF zum Herunterladen oder Ausdrucken.</p>
                <a
                  href="https://www.vcds.de/wp-content/uploads/2024/09/VCDS-Nachruestung-AHK.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors"
                >
                  <Icon name="download" size={14} />
                  PDF herunterladen
                </a>
              </div>
            </div>
          </section>

          {/* Forum + Support */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Hilfe bei Fragen</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://forum.vcds.de/c/codierung-anpassung/21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon name="chat" size={16} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">VCDS Forum</h3>
                  <p className="text-xs text-slate-500">Codierung &amp; Anpassung</p>
                </div>
              </a>
              <a
                href="https://wiki-online.vcds.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon name="globe" size={16} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">VCDS Wiki</h3>
                  <p className="text-xs text-slate-500">Alle Codierungen &amp; Plattformen</p>
                </div>
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
