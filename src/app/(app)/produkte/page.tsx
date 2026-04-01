import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { IconBox } from '@/components/ui/IconBox'
import { getProducts } from '@/lib/payload'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Produkte', description: 'VCDS Diagnoseadapter: HEX-V2 ab 294€, HEX-NET ab 514€. Komplettsysteme, Upgrades, Zubehör.' }

const connectionIcons: Record<string, string> = {
  'usb': 'usb',
  'wifi-usb': 'wifi',
  'other': 'plug',
}

const connectionLabels: Record<string, string> = {
  'usb': 'USB',
  'wifi-usb': 'WLAN',
}

const categoryIcons: Record<string, string> = {
  'hex-v2': 'usb',
  'hex-net': 'wifi',
  'adapter': 'plug',
  'komplettsysteme': 'shield',
  'upgrades': 'bolt',
  'zubehoer': 'cog',
}

const fallbackCats = [
  { n:'HEX-NET', p:'ab 514 €', b:'WLAN', d:'Kabelloser Diagnoseadapter mit WLAN. 10 oder unbegrenzte Fahrzeuge.', ic:'wifi', url:'https://www.auto-intern.de/shop/diagnose-adapter/199/hex-net-wifi-inkl.-vcds-lizenz' },
  { n:'HEX-V2', p:'ab 294 €', b:'USB', d:'Kabelgebundener Adapter. 3, 10 oder unbegrenzte Fahrzeuge.', ic:'usb', url:'https://www.auto-intern.de/shop/diagnose-adapter/198/hex-v2-inkl.-vcds-lizenz' },
  { n:'Diagnose-Adapter', p:'', b:'', d:'Diverse Adapter mit Fehlercode-Auslesung und Messwertaufzeichnung.', ic:'plug', url:'https://auto-intern.de/shop/' },
  { n:'Komplettsysteme', p:'', b:'', d:'Komplettsets für professionelle Werkstätten.', ic:'shield', url:'https://auto-intern.de/shop/' },
  { n:'Upgrades', p:'', b:'', d:'Ältere Adapter auf den neuesten Standard upgraden.', ic:'bolt', url:'https://www.auto-intern.de/shop/upgrades-erweiterungsmodule/' },
  { n:'Zubehör', p:'', b:'', d:'Adapterkabel, Transportkoffer, USB-Sticks mit Software.', ic:'cog', url:'https://auto-intern.de/shop/' },
]

export default async function Produkte() {
  let cats = fallbackCats

  try {
    const cmsProducts = await getProducts()
    if (cmsProducts.length > 0) {
      cats = cmsProducts.map(p => ({
        n: p.name,
        p: p.price ?? '',
        b: p.connection ? (connectionLabels[p.connection] ?? '') : '',
        d: p.shortDescription ?? '',
        ic: p.connection ? (connectionIcons[p.connection] ?? categoryIcons[p.category] ?? 'plug') : (categoryIcons[p.category] ?? 'plug'),
        url: p.shopUrl ?? 'https://auto-intern.de/shop/',
      }))
    }
  } catch {
    // CMS not available
  }

  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Produkte"
          title="Produktübersicht"
          description="Alle VCDS Diagnoseadapter im Überblick. Erhältlich im Auto-Intern Shop."
        />

        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[{ic:'search',t:'Präzise Diagnose',d:'Alle Steuergeräte auslesen'},{ic:'cog',t:'Einfache Codierung',d:'Funktionen freischalten'},{ic:'bolt',t:'Auto-Scan',d:'Komplett in Minuten'}].map(f => (
              <Card key={f.t} className="text-center">
                <IconBox icon={f.ic} size="lg" className="mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-1">{f.t}</h3>
                <p className="text-sm text-slate-500">{f.d}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            {cats.map(c => (
              <Card key={c.n} variant="interactive" padding="tight" className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <IconBox icon={c.ic} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-900">{c.n}</h3>
                    {c.b && <Badge>{c.b}</Badge>}
                  </div>
                  <p className="text-sm text-slate-500">{c.d}</p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  {c.p && <span className="font-bold text-blue-600">{c.p}</span>}
                  <Button variant="primary" size="sm" href={c.url} external>Zum Shop</Button>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">Alle Produkte erhältlich unter auto-intern.de/shop</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
