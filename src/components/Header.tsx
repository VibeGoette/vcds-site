'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

const nav = [
  { label: 'Start', href: '/', children: [
    { label: 'Fachhändler', href: '/fachhaendler' },
    { label: 'Blog', href: '/blog' },
    { label: 'Wiki', href: 'https://wiki.vcds.de', ext: true },
    { label: 'Forum', href: 'https://forum.vcds.de', ext: true },
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

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState<string|null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setDrop(null) }, [pathname])

  const active = (h: string) => h === '/' ? pathname === '/' : pathname.startsWith(h)

  return (
    <header className={`sticky top-0 z-50 bg-white border-b transition-all ${scrolled ? 'h-14 shadow-sm border-transparent' : 'h-16 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-5 h-full flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1 shrink-0" aria-label="VCDS.de Startseite">
          <span className="text-lg font-bold text-blue-600">VCDS</span>
          <span className="text-lg font-bold text-slate-300">.de</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hauptnavigation">
          {nav.map(item => (
            <div key={item.label} className="relative group"
              onMouseEnter={() => item.children && setDrop(item.label)}
              onMouseLeave={() => setDrop(null)}>
              {item.children ? (
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${active(item.href) ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  aria-expanded={drop === item.label} aria-haspopup="true">
                  {item.label}
                  <Icon name="chevron" size={12} className="text-slate-400" />
                </button>
              ) : (
                <Link href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${active(item.href) ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                  {item.label}
                </Link>
              )}
              {item.children && (
                <div className={`absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-slate-100 rounded-xl shadow-lg py-2 transition-all ${drop === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`} role="menu">
                  {item.children.map(c => (
                    <Link key={c.href} href={c.href} role="menuitem"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 mx-1 rounded-md transition-colors"
                      {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {c.label}
                      {c.ext && <Icon name="arrow" size={10} className="ml-auto text-slate-300" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
            className="ml-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 transition-colors">
            Zum Shop
          </a>
        </nav>

        <button className="lg:hidden p-2 rounded-md hover:bg-slate-100" onClick={() => setOpen(!open)}
          aria-expanded={open} aria-label={open ? 'Menü schließen' : 'Menü öffnen'}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg" aria-label="Mobile Navigation">
          <div className="max-w-6xl mx-auto px-5 py-4 space-y-1">
            {nav.map(item => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.children && item.children.map(c => (
                  <Link key={c.href} href={c.href} className="block pl-4 py-1.5 text-sm text-slate-500 hover:text-blue-600" onClick={() => setOpen(false)}
                    {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
              className="block mt-3 text-center py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors">
              Zum Shop
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
