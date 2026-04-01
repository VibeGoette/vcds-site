'use client'

import { Icon } from '@/components/Icon'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

type DLItem = { title: string; ver?: string; date?: string; adapters?: string[]; notice?: string; url: string }

function DLCard({ d }: { d: DLItem }) {
  return (
    <Card variant="interactive" padding="tight">
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
          {d.adapters && <div className="flex flex-wrap gap-1 mt-2 ml-6">{d.adapters.map(a => <Badge key={a}>{a}</Badge>)}</div>}
          {d.notice && <div className="mt-2 ml-6 flex items-start gap-1.5"><Icon name="warning" size={12} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-xs text-amber-700">{d.notice}</p></div>}
        </div>
        <Button variant="secondary" size="sm" href={d.url} external>
          <Icon name="download" size={14} />Download
        </Button>
      </div>
    </Card>
  )
}

const dlVcds: DLItem[] = [
  { title:'VCDS DRV (DE)', ver:'25.3.2', date:'29.01.2026', adapters:['HEX-V2','HEX-NET','Multiscan'], url:'https://download.ross-tech.de/drv' },
  { title:'VCDS (EN)', ver:'25.3.2', date:'20.10.2025', adapters:['HEX-V2','HEX-NET'], url:'https://www.ross-tech.com/vcds/download/current.php' },
  { title:'VCDS Beta (EN)', notice:'Adapter muss auf Beta-Kanal stehen', url:'https://www.ross-tech.com/vcds/download/beta/current.php' },
  { title:'VCDS Mobile Assistant', notice:'Android 4.1+, nur mit HEX-NET', url:'https://play.google.com/store/apps/details?id=com.ross_tech.vcds_mobile_assistant&hl=de' },
]
const dlSupport: DLItem[] = [
  { title:'Fernwartung (AnyDesk)', url:'https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip' },
  { title:'USB Treiber (Multiscan)', notice:'Nicht mit Windows 11 kompatibel', url:'https://www.vcds.de/wp-content/uploads/2024/08/usb-driver.zip' },
]
const dlTools: DLItem[] = [
  { title:'VCDServiceReset', ver:'1.1', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDServiceResetV1.1.zip' },
  { title:'CodingCompare', ver:'2.3.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/CodingCompareV2.3.0.zip' },
  { title:'VCDScripter', ver:'1.8.0', url:'https://www.vcds.de/wp-content/uploads/2024/08/VCDScripter_V1.8.0.zip' },
]

export function DownloadTabs() {
  return (
    <Tabs defaultValue="vcds">
      <TabsList>
        <TabsTrigger value="vcds">VCDS Software</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>
      <TabsContent value="vcds">
        <div className="space-y-3">{dlVcds.map((d, i) => <DLCard key={i} d={d} />)}</div>
      </TabsContent>
      <TabsContent value="support">
        <div className="space-y-3">{dlSupport.map((d, i) => <DLCard key={i} d={d} />)}</div>
      </TabsContent>
      <TabsContent value="tools">
        <div className="space-y-3">{dlTools.map((d, i) => <DLCard key={i} d={d} />)}</div>
      </TabsContent>
    </Tabs>
  )
}
