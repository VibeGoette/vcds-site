'use client'
import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.getElementById('article-body')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      // PERF-06: short articles that fit entirely on screen have total <= 0,
      // which would otherwise produce Infinity/NaN. Treat them as fully read.
      if (total <= 0) { setProgress(100); return }
      setProgress(Math.min(100, Math.max(0, (-rect.top / total) * 100)))
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Lesefortschritt"
    >
      <div
        className={`h-full bg-gradient-to-r from-primary-500 via-cyan-400 to-primary-500 transition-all duration-150 ${progress > 2 ? 'progress-glow' : ''}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
