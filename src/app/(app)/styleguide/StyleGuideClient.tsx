'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { Card } from '@/components/ui/Card'

export function StyleGuideAccordion() {
  return (
    <Card padding="tight" className="max-w-2xl overflow-hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>Für welche Fahrzeugmarken ist VCDS geeignet?</AccordionTrigger>
          <AccordionContent>VW, Audi, SEAT, Škoda, Bentley, Bugatti, Lamborghini und einige Porsche-Modelle.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Welche Folgekosten habe ich nach dem Kauf?</AccordionTrigger>
          <AccordionContent>Keine. Updates innerhalb der gleichen Hauptversion sind kostenlos.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>Kann ich VCDS auf meinem Mac nutzen?</AccordionTrigger>
          <AccordionContent>VCDS ist Windows-basiert. Über Boot Camp oder Parallels möglich, aber ohne Garantie.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
