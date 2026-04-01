import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { IconBox } from '@/components/ui/IconBox'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Fachhändler', description: 'Autorisierte VCDS Fachhändler in Deutschland, Österreich und der Schweiz.' }

const dealers = [
  { name:'CCD Car Diagnostics', city:'Bochum', country:'DE', url:'https://car-diagnostics.eu' },
  { name:'Auto-Intern', city:'Bochum', country:'DE', url:'https://www.auto-intern.de/shop/' },
  { name:'SLSpeed', city:'Waldeck', country:'DE', url:'https://www.slspeed.de/de/' },
  { name:'KFZ-Verlag', city:'Nettetal', country:'DE', url:'https://www.kfz-verlag.de' },
  { name:'reichelt Elektronik', city:'Sande', country:'DE', url:'https://www.reichelt.de' },
  { name:'VCDS-Shop.at', city:'Deutschlandsberg', country:'AT', url:'https://www.vcds-shop.at' },
  { name:'Spezialwerkstatt Egger', city:'Österreich', country:'AT', url:'https://www.spezialwerkzeug.at' },
  { name:'Wertec Werkstattbedarf', city:'Wangen', country:'CH', url:'https://www.wertec.ch' },
  { name:'Autotronic', city:'Schweiz', country:'CH', url:'https://www.autotronic-shop.ch' },
]

export default function Fachhaendler() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Fachhändler"
          title="VCDS Fachhändler"
          description="Autorisierte Händler in Deutschland, Österreich und der Schweiz. Kaufen Sie nur bei autorisierten Partnern."
        />
        <div className="max-w-4xl mx-auto px-5 py-12">
          <div className="space-y-3">
            {dealers.map(d => (
              <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-blue-200 transition-colors group">
                <IconBox icon="map" size="sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{d.name}</h3>
                  <p className="text-sm text-slate-500">{d.city} · {d.country}</p>
                </div>
                <Icon name="arrow" size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
