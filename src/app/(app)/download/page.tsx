import { Header } from '@/components/Header'
import { SoftwareSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { getDownloads } from '@/lib/payload'
import { DownloadTabs, type DLItem } from './DownloadTabs'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('download', {
  title: 'Download',
  description: 'Aktuelle VCDS-Software, Support-Tools und Treiber herunterladen.',
})
}

const fallbackVcds: DLItem[] = [
  { title:'VCDS DRV (DE)', ver:'25.3.2', date:'29.01.2026', adapters:['HEX-V2','HEX-NET','Multiscan'], url:'https://download.ross-tech.de/drv' },
  { title:'VCDS (EN)', ver:'25.3.2', date:'20.10.2025', adapters:['HEX-V2','HEX-NET'], url:'https://www.ross-tech.com/vcds/download/current.php' },
  { title:'VCDS Beta (EN)', notice:'Adapter muss auf Beta-Kanal stehen', url:'https://www.ross-tech.com/vcds/download/beta/current.php' },
  { title:'VCDS Mobile Assistant', notice:'Android 4.1+, nur mit HEX-NET', url:'https://play.google.com/store/apps/details?id=com.ross_tech.vcds_mobile_assistant&hl=de' },
]
const fallbackSupport: DLItem[] = [
  { title:'Fernwartung (AnyDesk)', url:'https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip' },
  { title:'USB Treiber (Multiscan)', notice:'Nicht mit Windows 11 kompatibel', url:'https://www.vcds.de/wp-content/uploads/2024/08/usb-driver.zip' },
]
const fallbackTools: DLItem[] = [
  { title:'VCDServiceReset', ver:'1.1', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDServiceResetV1.1.zip' },
  { title:'CodingCompare', ver:'2.3.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/CodingCompareV2.3.0.zip' },
  { title:'VCDScripter', ver:'1.8.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDScripter_V1.8.0.zip' },
]

export default async function Download() {
  let vcds = fallbackVcds
  let support = fallbackSupport
  let tools = fallbackTools

  try {
    const cmsDownloads = await getDownloads()
    if (cmsDownloads.length > 0) {
      const mapped = cmsDownloads.map(d => {
        // Resolve download URL: uploaded file or external URL
        let url = ''
        if (d.downloadSource === 'upload' && d.downloadFile && typeof d.downloadFile === 'object' && 'url' in d.downloadFile) {
          url = (d.downloadFile as { url: string }).url
        } else {
          url = d.downloadUrl ?? ''
        }

        return {
          title: d.title,
          ver: d.version ?? undefined,
          date: d.dataDate ?? undefined,
          adapters: Array.isArray(d.compatibleAdapters) ? d.compatibleAdapters as string[] : undefined,
          notice: d.notice ?? undefined,
          url,
          category: d.category,
          fileSize: d.fileSize ?? undefined,
          systemRequirements: d.systemRequirements ?? undefined,
          changelog: d.changelog ?? undefined,
          changelogUrl: d.changelogUrl ?? undefined,
          isLatest: d.autoUpdate?.isLatest ?? undefined,
          channel: d.autoUpdate?.channel ?? undefined,
        }
      })

      const cmsVcds = mapped.filter(d => d.category === 'vcds')
      const cmsSupport = mapped.filter(d => d.category === 'support')
      const cmsTools = mapped.filter(d => d.category === 'tools')

      if (cmsVcds.length > 0) vcds = cmsVcds
      if (cmsSupport.length > 0) support = cmsSupport
      if (cmsTools.length > 0) tools = cmsTools
    }
  } catch {
    // CMS not available
  }

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
          <DownloadTabs vcds={vcds} support={support} tools={tools} />
        </div>
      </main>
      <Footer />
    </>
  )
}
