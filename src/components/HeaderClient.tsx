'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

interface NavChild { label: string; href: string; isExternal?: boolean }
interface NavItem { label: string; href: string; isExternal?: boolean; children?: NavChild[] }

export function HeaderClient({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDrop, setActiveDrop] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveDrop(null) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMobileOpen(false); setActiveDrop(null) } }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  const isActive = useCallback((href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href), [pathname])

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-all duration-200 ${scrolled ? 'h-14 shadow-sm border-slate-100' : 'h-16 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 h-full flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1 shrink-0" aria-label="VCDS.de Startseite">
          <span className="text-lg font-bold text-blue-600">VCDS</span>
          <span className="text-lg font-bold text-slate-300">.de</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hauptnavigation">
          {navItems.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.children && setActiveDrop(item.label)}
              onMouseLeave={() => setActiveDrop(null)}>
              {item.children ? (
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive(item.href) ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  aria-expanded={activeDrop === item.label} aria-haspopup="true"
                  onClick={() => setActiveDrop(activeDrop === item.label ? null : item.label)}>
                  {item.label}
                  <Icon name="chevron" size={12} className={`text-slate-400 transition-transform duration-200 ${activeDrop === item.label ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                  {item.label}
                </Link>
              )}
              {item.children && (
                <div className={`absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-slate-100 rounded-xl shadow-lg py-2 transition-all duration-200 ${activeDrop === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`} role="menu">
                  {item.children.map(c => (
                    <Link key={c.href} href={c.href} role="menuitem"
                      className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 mx-1 rounded-md transition-colors"
                      {...(c.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {c.label}
                      {c.isExternal && <Icon name="arrow" size={10} className="ml-auto text-slate-300" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
            className="ml-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 active:bg-red-700 transition-colors">
            Zum Shop
          </a>
        </nav>

        <button className="lg:hidden p-2.5 -mr-1 rounded-md hover:bg-slate-100 active:bg-slate-200 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 top-14 bg-black/20 z-40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav className="lg:hidden fixed top-14 left-0 right-0 bg-white border-b shadow-xl z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain" aria-label="Mobile Navigation">
            <div className="max-w-6xl mx-auto px-4 py-3">
              {navItems.map(item => (
                <div key={item.label} className="border-b border-slate-100 last:border-0">
                  <Link href={item.href} className="flex items-center justify-between py-3.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 active:text-blue-700 transition-colors" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pb-2 space-y-0.5">
                      {item.children.map(c => (
                        <Link key={c.href} href={c.href}
                          className="flex items-center pl-4 py-2.5 text-sm text-slate-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors min-h-[44px]"
                          onClick={() => setMobileOpen(false)}
                          {...(c.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                          {c.label}
                          {c.isExternal && <Icon name="arrow" size={10} className="ml-2 text-slate-300" />}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1">
                <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
                  className="block text-center py-3.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 active:bg-red-700 transition-colors min-h-[48px] flex items-center justify-center">
                  Zum Shop
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
