'use client'
import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const u = () => {
      const el = document.getElementById('article-body')
      if (!el) return
      const r = el.getBoundingClientRect()
      const t = el.scrollHeight - window.innerHeight
      // PERF-06: short articles that fit entirely on screen have t <= 0,
      // which would otherwise produce Infinity/NaN. Treat them as fully read.
      if (t <= 0) { setP(100); return }
      setP(Math.min(100, Math.max(0, (-r.top / t) * 100)))
    }
    window.addEventListener('scroll', u, { passive: true })
    return () => window.removeEventListener('scroll', u)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className={`h-full bg-gradient-to-r from-primary-500 via-cyan-400 to-primary-500 transition-all duration-150 ${p > 2 ? 'progress-glow' : ''}`}
        style={{ width: `${p}%` }}
      />
    </div>
  )
}
