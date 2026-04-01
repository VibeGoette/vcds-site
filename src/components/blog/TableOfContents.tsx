'use client'
import { useState, useEffect } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 w-full py-3 border-b border-slate-200"
        >
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Inhaltsverzeichnis
        </button>
        {isOpen && (
          <nav className="py-3 pl-4">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm transition-colors block py-0.5 ${
                      activeId === h.id ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 self-start">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Inhalt</p>
        <ul className="space-y-1.5 border-l border-slate-200">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-[13px] transition-all duration-200 py-0.5 border-l-2 -ml-px ${
                  h.level === 3 ? 'pl-6' : 'pl-4'
                } ${
                  activeId === h.id
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
