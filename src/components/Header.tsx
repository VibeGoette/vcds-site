import { getNavigation } from '@/lib/payload'
import { HeaderClient } from './HeaderClient'

interface CmsNavChild {
  label: string
  href: string
  isExternal?: boolean
}

interface CmsNavItem {
  label: string
  href: string
  isExternal?: boolean
  children?: CmsNavChild[]
}

/** Icon + description metadata for nav items */
const navMeta: Record<string, { icon: string; desc: string }> = {
  'Fachhändler': { icon: 'map', desc: 'Autorisierte Partner finden' },
  'Blog': { icon: 'quote', desc: 'Tipps, Vergleiche & Updates' },
  'Wiki': { icon: 'globe', desc: 'Technische Dokumentation' },
  'Forum': { icon: 'chat', desc: 'Community & Support' },
  'Über VCDS': { icon: 'shield', desc: 'Was VCDS auszeichnet' },
  'Übersicht': { icon: 'plug', desc: 'Alle Interfaces im Vergleich' },
  'Kaufberatung': { icon: 'search', desc: 'Welches VCDS passt zu Ihnen?' },
  'Upgrade': { icon: 'bolt', desc: 'Lizenz erweitern' },
  'FAQ': { icon: 'chat', desc: 'Häufig gestellte Fragen' },
  'Quickstart': { icon: 'bolt', desc: 'In 5 Minuten startklar' },
  'Fernwartung': { icon: 'wifi', desc: 'Remote-Support erhalten' },
  'Troubleshooting': { icon: 'search', desc: 'Lösungen für häufige Probleme' },
  'VCDS User Map': { icon: 'map', desc: 'Nutzer & Werkstätten finden' },
  'AHK Codieren': { icon: 'cog', desc: 'Anhängerkupplung freischalten' },
}

/** Hardcoded fallback navigation in case CMS has no data yet */
const fallbackNav = [
  { label: 'Start', href: '/', children: [
    { label: 'Fachhändler', href: '/fachhaendler' },
    { label: 'VCDS User Map', href: '/usermap' },
    { label: 'Blog', href: '/blog' },
    { label: 'AHK Codieren', href: '/ahk-codieren' },
    { label: 'Wiki', href: 'https://wiki.vcds.de', isExternal: true },
    { label: 'Forum', href: 'https://forum.vcds.de', isExternal: true },
  ]},
  { label: 'Produkte', href: '/produkte', children: [
    { label: 'Über VCDS', href: '/ueber-vcds' },
    { label: 'Übersicht', href: '/produkte' },
    { label: 'Kaufberatung', href: '/kaufberatung' },
    { label: 'Upgrade', href: '/upgrade' },
  ]},
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Hilfe & FAQ', href: '/faq', children: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Troubleshooting', href: '/troubleshooting' },
    { label: 'Quickstart', href: '/quickstart' },
    { label: 'Fernwartung', href: '/fernwartung' },
  ]},
  { label: 'Download', href: '/download' },
]

export async function Header() {
  let navItems = fallbackNav

  try {
    const navigation = await getNavigation()
    if (navigation?.mainNav?.length) {
      navItems = (navigation.mainNav as CmsNavItem[]).map((item) => ({
        label: item.label,
        href: item.href,
        isExternal: item.isExternal ?? false,
        ...(item.children?.length ? {
          children: item.children.map((c) => ({
            label: c.label,
            href: c.href,
            isExternal: c.isExternal ?? false,
          })),
        } : {}),
      }))
    }
  } catch {
    // CMS not available — use fallback
  }

  // Enrich nav items with icon + description metadata
  const enriched = navItems.map(item => ({
    ...item,
    children: item.children?.map(c => ({
      ...c,
      icon: navMeta[c.label]?.icon ?? 'arrow',
      desc: navMeta[c.label]?.desc ?? '',
    })),
  }))

  return <HeaderClient navItems={enriched} />
}
