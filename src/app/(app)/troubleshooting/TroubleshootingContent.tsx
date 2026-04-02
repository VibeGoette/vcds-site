'use client'

import { Icon } from '@/components/Icon'
import { IconBox } from '@/components/ui/IconBox'
import { PageHero } from '@/components/ui/PageHero'
import { InfoBox } from '@/components/ui/InfoBox'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { sections } from './data'

export function TroubleshootingContent() {
  return (
    <>
      <PageHero
        breadcrumb="Start / Troubleshooting"
        title="Troubleshooting"
        description="Lösungen für die häufigsten Probleme mit VCDS — von der Installation über Verbindungsfehler bis zu Registrierungsfragen."
      />

      <div className="max-w-3xl mx-auto px-5 py-12 space-y-12">

        <nav aria-label="Kategorien">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-center">
                <IconBox icon={s.icon} size="sm" />
                <span className="text-xs font-semibold text-slate-700">{s.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`heading-${s.id}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={18} />
              </div>
              <h2 id={`heading-${s.id}`} className="text-xl font-bold text-slate-900">{s.title}</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <Accordion type="multiple">
                {s.problems.map((p, i) => (
                  <AccordionItem key={i} value={`${s.id}-${i}`}>
                    <AccordionTrigger>{p.q}</AccordionTrigger>
                    <AccordionContent>{p.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}

        <InfoBox variant="info" title="Problem nicht gelöst?">
          Wenn Ihr Problem hier nicht aufgeführt ist, stehen Ihnen weitere Hilfsangebote zur Verfügung:
        </InfoBox>

        <div className="grid sm:grid-cols-3 gap-3">
          <a href="/fernwartung" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-center">
            <IconBox icon="wifi" />
            <h3 className="font-bold text-sm text-slate-900">Fernwartung</h3>
            <p className="text-xs text-slate-500">Remote-Support via AnyDesk</p>
          </a>
          <a href="/faq" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-center">
            <IconBox icon="chat" />
            <h3 className="font-bold text-sm text-slate-900">FAQ</h3>
            <p className="text-xs text-slate-500">Häufig gestellte Fragen</p>
          </a>
          <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-center">
            <IconBox icon="globe" />
            <h3 className="font-bold text-sm text-slate-900">Forum <span className="sr-only">(öffnet neuen Tab)</span></h3>
            <p className="text-xs text-slate-500">Community-Hilfe</p>
          </a>
        </div>

      </div>
    </>
  )
}
