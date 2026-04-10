import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { lexicalToText } from '@/lib/serializeLexical'

interface FAQItem {
  id?: string
  question?: string
  answer?: unknown
}

interface FAQBlockProps {
  heading?: string
  headingLevel?: 'h2' | 'h3' | 'h4'
  faqs?: FAQItem[] | null
}

export function FAQBlockComponent({ heading, headingLevel, faqs }: FAQBlockProps) {
  if (!faqs || faqs.length === 0) return null

  const HeadingTag = (headingLevel ?? 'h3') as 'h2' | 'h3' | 'h4'

  return (
    <div className="my-10">
      {heading && <HeadingTag className="text-lg font-bold text-slate-800 mb-4">{heading}</HeadingTag>}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.id ?? `faq-${i}`} value={faq.id ?? `faq-${i}`}>
              <AccordionTrigger>{faq.question ?? 'Frage'}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lexicalToText(faq.answer as Parameters<typeof lexicalToText>[0])}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
