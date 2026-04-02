import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FAQSchema } from '@/components/StructuredData'
import { getPageSeo } from '@/lib/seo'
import { TroubleshootingContent } from './TroubleshootingContent'
import { sections } from './data'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('troubleshooting', {
    title: 'Troubleshooting – Fehlerbehebung',
    description: 'VCDS Troubleshooting: Lösungen für Verbindungsprobleme, Registrierung, Treiber-Installation und häufige Fehlermeldungen.',
  })
}

export default function TroubleshootingPage() {
  // Flatten all Q&A for FAQ structured data
  const allFaqs = sections.flatMap(s => s.problems.map(p => ({ q: p.q, a: p.a })))

  return (
    <>
      <Header />
      <FAQSchema items={allFaqs} />
      <main id="main">
        <TroubleshootingContent />
      </main>
      <Footer />
    </>
  )
}
