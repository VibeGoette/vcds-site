'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

interface NavChild { label: string; href: string; isExternal?: boolean; icon?: string; desc?: string }
interface NavItem { label: string; href: string; isExternal?: boolean; children?: NavChild[] }

export function HeaderClient({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDrop, setActiveDrop] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveDrop(null); setMobileExpanded(null) }, [pathname])

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

  // Delayed close to prevent flickering when moving mouse between trigger and dropdown
  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setActiveDrop(label)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDrop(null), 150)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-all duration-200 ${scrolled ? 'h-14 shadow-sm border-slate-100' : 'h-16 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 h-full flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1 shrink-0" aria-label="VCDS.de Startseite">
          <span className="text-lg font-bold text-blue-600">VCDS</span>
          <span className="text-lg font-bold text-slate-300">.de</span>
        </Link>

        {/* ═══ DESKTOP NAV ═══ */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Hauptnavigation">
          {navItems.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}>
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

              {/* ═══ DROPDOWN ═══ */}
              {item.children && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[260px] bg-white border border-slate-200 rounded-lg shadow-md transition-all duration-150 ${
                    activeDrop === item.label
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                  }`}
                  role="menu"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1.5 px-1.5">
                    {item.children.map((c) => {
                      const active = isActive(c.href)
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className={`group flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${
                            active
                              ? 'bg-slate-50 text-blue-600'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                          {...(c.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          <Icon name={c.icon ?? 'arrow'} size={14} className={active ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-600'} />
                          <div className="flex-1 min-w-0">
                            <span className={`text-[13px] font-medium ${
                              active ? 'text-blue-600' : 'text-slate-700 group-hover:text-slate-900'
                            }`}>
                              {c.label}
                            </span>
                            {c.desc && (
                              <p className="text-[11px] text-slate-400 leading-snug">{c.desc}</p>
                            )}
                          </div>
                          {c.isExternal && (
                            <svg className="w-3 h-3 text-slate-300 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                              <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
            className="ml-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 active:bg-red-700 transition-colors">
            Zum Shop
          </a>
        </nav>

        {/* ═══ MOBILE HAMBURGER ═══ */}
        <button className="lg:hidden p-2.5 -mr-1 rounded-md hover:bg-slate-100 active:bg-slate-200 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* ═══ MOBILE MENU ═══ */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 top-14 bg-black/20 z-40 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav className="lg:hidden fixed top-14 left-0 right-0 bg-white border-b shadow-xl z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain" aria-label="Mobile Navigation">
            <div className="max-w-6xl mx-auto px-4 py-2">
              {navItems.map(item => (
                <div key={item.label} className="border-b border-slate-100 last:border-0">
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full py-3.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        aria-expanded={mobileExpanded === item.label}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {isActive(item.href) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </span>
                        <Icon name="chevron" size={14} className={`text-slate-400 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === item.label ? 'max-h-[500px] opacity-100 pb-2' : 'max-h-0 opacity-0'}`}>
                        {item.children.map(c => {
                          const active = isActive(c.href)
                          return (
                            <Link key={c.href} href={c.href}
                              className={`flex items-center gap-3 pl-2 pr-3 py-3 rounded-lg transition-colors min-h-[48px] ${
                                active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                              }`}
                              onClick={() => setMobileOpen(false)}
                              {...(c.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                              }`}>
                                <Icon name={c.icon ?? 'arrow'} size={14} />
                              </div>
                              <div className="flex-1">
                                <span className="text-sm font-medium">{c.label}</span>
                                {c.desc && <p className="text-[11px] text-slate-400 mt-0.5">{c.desc}</p>}
                              </div>
                              {c.isExternal && (
                                <svg className="w-3.5 h-3.5 text-slate-300 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                  <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href}
                      className="flex items-center justify-between py-3.5 text-[15px] font-semibold text-slate-800 hover:text-blue-600 active:text-blue-700 transition-colors"
                      onClick={() => setMobileOpen(false)}>
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isActive(item.href) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-2">
                <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center py-3.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 active:bg-red-700 transition-colors min-h-[48px] text-sm">
                  Zum Shop
                  <Icon name="arrow" size={14} className="ml-2" />
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
