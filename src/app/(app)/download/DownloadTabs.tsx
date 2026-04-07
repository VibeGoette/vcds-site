'use client'

import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Markdown } from '@/components/Markdown'

export type DLItem = {
  title: string
  ver?: string
  date?: string
  adapters?: string[]
  notice?: string
  url: string
  fileSize?: string
  systemRequirements?: string
  changelog?: string
  changelogUrl?: string
  isLatest?: boolean
  channel?: string
}

function DLCard({ d }: { d: DLItem }) {
  const [showChangelog, setShowChangelog] = useState(false)

  return (
    <Card variant="interactive" padding="tight">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Icon name="download" size={16} className="text-primary-500 shrink-0" />
            <h3 className="font-bold text-slate-900">{d.title}</h3>
            {d.isLatest && <Badge variant="green" size="sm">Aktuell</Badge>}
            {d.channel === 'beta' && <Badge variant="amber" size="sm">Beta</Badge>}
          </div>
          <div className="ml-6 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            {d.ver && <span className="text-xs text-slate-400">v{d.ver}</span>}
            {d.date && <span className="text-xs text-slate-400">{d.date}</span>}
            {d.fileSize && <span className="text-xs text-slate-400">{d.fileSize}</span>}
          </div>
          {d.adapters && <div className="flex flex-wrap gap-1 mt-2 ml-6">{d.adapters.map(a => <Badge key={a}>{a}</Badge>)}</div>}
          {d.systemRequirements && (
            <p className="text-xs text-slate-400 mt-2 ml-6">
              <span className="font-semibold">Voraussetzungen:</span> {d.systemRequirements}
            </p>
          )}
          {d.notice && <div className="mt-2 ml-6 flex items-start gap-1.5"><Icon name="warning" size={12} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-xs text-amber-700">{d.notice}</p></div>}
          {(d.changelog || d.changelogUrl) && (
            <div className="ml-6 mt-2">
              {d.changelog ? (
                <button
                  onClick={() => setShowChangelog(!showChangelog)}
                  className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
                >
                  <Icon name="chevron" size={10} className={`transition-transform ${showChangelog ? 'rotate-180' : ''}`} />
                  {showChangelog ? 'Changelog ausblenden' : 'Changelog anzeigen'}
                </button>
              ) : d.changelogUrl ? (
                <a href={d.changelogUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline font-semibold">
                  Changelog ansehen
                </a>
              ) : null}
            </div>
          )}
        </div>
        <Button variant="secondary" size="sm" href={d.url} external>
          <Icon name="download" size={14} />Download
        </Button>
      </div>
      {showChangelog && d.changelog && (
        <div className="mt-4 pt-4 border-t border-slate-100 ml-6">
          <Markdown content={d.changelog} />
        </div>
      )}
    </Card>
  )
}

interface DownloadTabsProps {
  vcds: DLItem[]
  support: DLItem[]
  tools: DLItem[]
}

export function DownloadTabs({ vcds, support, tools }: DownloadTabsProps) {
  return (
    <Tabs defaultValue="vcds">
      <TabsList>
        <TabsTrigger value="vcds">VCDS Software</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>
      <TabsContent value="vcds">
        <div className="space-y-3">{vcds.map(d => <DLCard key={d.title} d={d} />)}</div>
      </TabsContent>
      <TabsContent value="support">
        <div className="space-y-3">{support.map(d => <DLCard key={d.title} d={d} />)}</div>
      </TabsContent>
      <TabsContent value="tools">
        <div className="space-y-3">{tools.map(d => <DLCard key={d.title} d={d} />)}</div>
      </TabsContent>
    </Tabs>
  )
}
