import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { InfoBox } from '@/components/ui/InfoBox'
import { Badge } from '@/components/ui/Badge'
import { FeatureItem } from '@/components/ui/FeatureItem'
import { Section } from '@/components/ui/Section'
import { IconBox } from '@/components/ui/IconBox'
import { StyleGuideAccordion } from './StyleGuideClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Style Guide',
  robots: { index: false, follow: false },
}

const iconNames = ['check','chevron','phone','mail','chat','download','search','cog','shield','bolt','users','map','warning','globe','plug','usb','wifi','clock','arrow','quote','info','book']

export default function StyleGuide() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Intern / Style Guide"
          title="VCDS.de Style Guide"
          description="Alle wiederverwendbaren Komponenten, Farben, Typografie und Icons auf einen Blick."
        />

        {/* ═══ COLORS ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Farben</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Blue 600', class: 'bg-blue-600', hex: '#2563eb' },
              { name: 'Blue 400', class: 'bg-blue-400', hex: '#60a5fa' },
              { name: 'Blue 50', class: 'bg-blue-50 border', hex: '#eff6ff' },
              { name: 'Red 600', class: 'bg-red-600', hex: '#dc2626' },
              { name: 'Slate 900', class: 'bg-slate-900', hex: '#0f172a' },
              { name: 'Slate 700', class: 'bg-slate-700', hex: '#334155' },
              { name: 'Slate 500', class: 'bg-slate-500', hex: '#64748b' },
              { name: 'Slate 200', class: 'bg-slate-200', hex: '#e2e8f0' },
              { name: 'Slate 50', class: 'bg-slate-50 border', hex: '#f8fafc' },
              { name: 'Amber 500', class: 'bg-amber-500', hex: '#f59e0b' },
              { name: 'Emerald 600', class: 'bg-emerald-600', hex: '#059669' },
              { name: 'White', class: 'bg-white border', hex: '#ffffff' },
            ].map(c => (
              <div key={c.name}>
                <div className={`${c.class} h-16 rounded-xl border-slate-200`} />
                <p className="text-xs font-bold text-slate-900 mt-2">{c.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ TYPOGRAPHY ═══ */}
        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Typografie</h2>
          <div className="space-y-4 bg-white rounded-2xl border border-slate-200 p-6">
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-3xl md:text-5xl font-bold</span><h1 className="text-3xl md:text-5xl font-bold text-slate-900">Seitenüberschrift (H1)</h1></div>
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-2xl md:text-3xl font-bold</span><h2 className="text-2xl md:text-3xl font-bold text-slate-900">Abschnitt (H2)</h2></div>
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-xl font-bold</span><h3 className="text-xl font-bold text-slate-900">Unterabschnitt (H3)</h3></div>
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-base text-slate-600</span><p className="text-base text-slate-600">Fließtext: VCDS ist das professionelle Diagnosewerkzeug für VW, Audi, Skoda und Seat.</p></div>
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-sm text-slate-500</span><p className="text-sm text-slate-500">Kleintext / Beschreibung: Über 32.445 Fehlercodes im Klartext.</p></div>
            <div><span className="text-[10px] text-slate-400 font-mono block mb-1">text-xs text-slate-400</span><p className="text-xs text-slate-400">Meta-Text: Mo–Fr 09:00–16:00 Uhr · support@vcds.de</p></div>
          </div>
        </Section>

        {/* ═══ BUTTONS ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Buttons</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Varianten</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary (Shop)</Button>
                <Button variant="secondary">Secondary (Aktion)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Größen</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="default">Default</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Als Link</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" href="https://auto-intern.de/shop/" external>Im Shop bestellen</Button>
                <Button variant="outline" href="/kaufberatung">Kaufberatung</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ CARDS ═══ */}
        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Cards</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <h3 className="font-bold text-slate-900 mb-2">Default Card</h3>
              <p className="text-sm text-slate-500">Einfache Karte ohne Hover-Effekt.</p>
            </Card>
            <Card variant="interactive">
              <h3 className="font-bold text-slate-900 mb-2">Interactive Card</h3>
              <p className="text-sm text-slate-500">Mit Hover: blauer Border + Schatten.</p>
            </Card>
            <Card variant="muted">
              <h3 className="font-bold text-slate-900 mb-2">Muted Card</h3>
              <p className="text-sm text-slate-500">Grauer Hintergrund für Sidebar-Elemente.</p>
            </Card>
          </div>
        </Section>

        {/* ═══ INFO BOXES ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Info-Boxen</h2>
          <div className="space-y-4 max-w-2xl">
            <InfoBox variant="info" title="Info">Informationstext für den Benutzer.</InfoBox>
            <InfoBox variant="warning" title="Warnung">Warnhinweis — bitte beachten.</InfoBox>
            <InfoBox variant="success" title="Erfolg">Aktion erfolgreich abgeschlossen.</InfoBox>
            <InfoBox variant="danger" title="Fehler">Fehlerhafte Eingabe — bitte korrigieren.</InfoBox>
          </div>
        </Section>

        {/* ═══ BADGES ═══ */}
        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="blue">USB</Badge>
            <Badge variant="green">WLAN</Badge>
            <Badge variant="amber">Beta</Badge>
            <Badge variant="red">Wichtig</Badge>
            <Badge variant="slate">Standard</Badge>
            <Badge variant="purple">Neu</Badge>
            <Badge variant="blue" size="default">Größe: Default</Badge>
          </div>
        </Section>

        {/* ═══ FEATURE LIST ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Feature-Liste</h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            <FeatureItem>Fehlercodes auslesen</FeatureItem>
            <FeatureItem>Messwerte aufzeichnen</FeatureItem>
            <FeatureItem>Codierungen durchführen</FeatureItem>
            <FeatureItem icon="shield">Kostenloser Support</FeatureItem>
            <FeatureItem icon="bolt" iconColor="text-amber-500">Auto-Scan</FeatureItem>
            <FeatureItem icon="warning" iconColor="text-red-500">Warnung</FeatureItem>
          </div>
        </Section>

        {/* ═══ ICON BOXES ═══ */}
        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Icon-Boxen</h2>
          <div className="flex flex-wrap gap-4">
            <div className="text-center"><IconBox icon="usb" size="sm" /><p className="text-[10px] text-slate-400 mt-1">sm</p></div>
            <div className="text-center"><IconBox icon="wifi" /><p className="text-[10px] text-slate-400 mt-1">default</p></div>
            <div className="text-center"><IconBox icon="shield" size="lg" /><p className="text-[10px] text-slate-400 mt-1">lg</p></div>
            <div className="text-center"><IconBox icon="phone" shape="circle" /><p className="text-[10px] text-slate-400 mt-1">circle</p></div>
            <div className="text-center"><IconBox icon="warning" color="amber" /><p className="text-[10px] text-slate-400 mt-1">amber</p></div>
            <div className="text-center"><IconBox icon="check" color="green" /><p className="text-[10px] text-slate-400 mt-1">green</p></div>
          </div>
        </Section>

        {/* ═══ ACCORDION ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Accordion</h2>
          <StyleGuideAccordion />
        </Section>

        {/* ═══ ICONS ═══ */}
        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Icons ({iconNames.length})</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {iconNames.map(name => (
              <div key={name} className="bg-white border border-slate-200 rounded-xl p-3 text-center hover:border-blue-200 transition-colors">
                <Icon name={name} size={20} className="text-slate-600 mx-auto mb-2" />
                <p className="text-[10px] text-slate-400 font-mono">{name}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ PAGE HERO ═══ */}
        <Section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Page Hero</h2>
          <p className="text-sm text-slate-500 mb-4">Der dunkle Gradient-Hero wird auf jeder Unterseite verwendet. Siehe oben auf dieser Seite.</p>
          <div className="bg-slate-100 rounded-xl p-4 font-mono text-xs text-slate-600">
            {'<PageHero breadcrumb="Start / Seite" title="Seitentitel" description="Beschreibung..." />'}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
