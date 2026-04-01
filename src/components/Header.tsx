import { getNavigation } from '@/lib/payload'
import { HeaderClient } from './HeaderClient'

/** Hardcoded fallback navigation in case CMS has no data yet */
const fallbackNav = [
  { label: 'Start', href: '/', children: [
    { label: 'Fachhändler', href: '/fachhaendler' },
    { label: 'Blog', href: '/blog' },
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
      navItems = navigation.mainNav.map((item: any) => ({
        label: item.label,
        href: item.href,
        isExternal: item.isExternal ?? false,
        ...(item.children?.length ? {
          children: item.children.map((c: any) => ({
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

  return <HeaderClient navItems={navItems} />
}
