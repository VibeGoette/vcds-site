'use client'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'

const dlVcds = [
  { title:'VCDS DRV (DE)', ver:'25.3.2', date:'29.01.2026', adapters:['HEX-V2','HEX-NET','Multiscan'], url:'https://download.ross-tech.de/drv' },
  { title:'VCDS (EN)', ver:'25.3.2', date:'20.10.2025', adapters:['HEX-V2','HEX-NET'], url:'https://www.ross-tech.com/vcds/download/current.php' },
  { title:'VCDS Beta (EN)', notice:'Adapter muss auf Beta-Kanal stehen', url:'https://www.ross-tech.com/vcds/download/beta/current.php' },
  { title:'VCDS Mobile Assistant', notice:'Android 4.1+, nur mit HEX-NET', url:'https://play.google.com/store/apps/details?id=com.ross_tech.vcds_mobile_assistant&hl=de' },
]
const dlSupport = [
  { title:'Fernwartung (AnyDesk)', url:'https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip' },
  { title:'USB Treiber (Multiscan)', notice:'Nicht mit Windows 11 kompatibel', url:'https://www.vcds.de/wp-content/uploads/2024/08/usb-driver.zip' },
]
const dlTools = [
  { title:'VCDServiceReset', ver:'1.1', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDServiceResetV1.1.zip' },
  { title:'CodingCompare', ver:'2.3.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/CodingCompareV2.3.0.zip' },
  { title:'VCDScripter', ver:'1.8.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDScripter_V1.8.0.zip' },
]

type DLItem = { title:string; ver?:string; date?:string; adapters?:string[]; notice?:string; url:string }

function DLCard({ d }: { d: DLItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon name="download" size={16} className="text-blue-500 shrink-0" />
            <h3 className="font-bold text-slate-900">{d.title}</h3>
          </div>
          {(d.ver || d.date) && (
            <p className="text-xs text-slate-400 mt-1 ml-6">
              {d.ver && <span>v{d.ver}</span>}{d.ver && d.date && ' · '}{d.date && <span>{d.date}</span>}
            </p>
          )}
          {d.adapters && <div className="flex flex-wrap gap-1 mt-2 ml-6">{d.adapters.map(a => <span key={a} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">{a}</span>)}</div>}
          {d.notice && <div className="mt-2 ml-6 flex items-start gap-1.5"><Icon name="warning" size={12} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-xs text-amber-700">{d.notice}</p></div>}
        </div>
        <a href={d.url} target="_blank" rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors flex items-center gap-1.5">
          <Icon name="download" size={14} className="text-white" />Download
        </a>
      </div>
    </div>
  )
}

export default function Download() {
  const [tab, setTab] = useState<'vcds'|'support'|'tools'>('vcds')
  const items = tab === 'vcds' ? dlVcds : tab === 'support' ? dlSupport : dlTools
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto"><p className="text-xs text-slate-400 mb-3">Start / Download</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Download</h1>
            <p className="text-slate-300 max-w-xl">Aktuelle VCDS-Software, Support-Tools und Treiber.</p>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-5 py-10">
          <div className="flex gap-1 border-b border-slate-200 mb-6" role="tablist">
            {([['vcds','VCDS Software'],['support','Support'],['tools','Tools']] as const).map(([id,l]) => (
              <button key={id} role="tab" aria-selected={tab===id} onClick={()=>setTab(id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab===id ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="space-y-3" role="tabpanel">{items.map((d,i) => <DLCard key={i} d={d} />)}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
