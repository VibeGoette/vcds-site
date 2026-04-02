import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { QuickstartWizard, stepCount } from './QuickstartWizard'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('quickstart', {
  title: 'Quickstart',
  description: 'Interaktiver Leitfaden zur Ersteinrichtung Ihres VCDS-Adapters.',
})
}

export default function Quickstart() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Quickstart"
          title="Quickstart & Registrierung"
          description={`Der interaktive Leitfaden zur Ersteinrichtung Ihres VCDS-Adapters. In ${stepCount} Schritten vom Auspacken bis zur fertigen Diagnose.`}
        />
        <QuickstartWizard />
      </main>
      <Footer />
    </>
  )
}
