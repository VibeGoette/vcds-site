import { Header } from '@/components/Header'
import { SoftwareSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { DownloadTabs } from './DownloadTabs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Aktuelle VCDS-Software, Support-Tools und Treiber herunterladen.',
}

export default function Download() {
  return (
    <>
      <SoftwareSchema />
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Download"
          title="Download"
          description="Aktuelle VCDS-Software, Support-Tools und Treiber."
        />
        <div className="max-w-4xl mx-auto px-5 py-10">
          <DownloadTabs />
        </div>
      </main>
      <Footer />
    </>
  )
}
