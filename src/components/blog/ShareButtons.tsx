'use client'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : `https://vcds.de/blog/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: do nothing
    }
  }

  const mailSubject = encodeURIComponent(title)
  const mailBody = encodeURIComponent(`${title}\n\n${url}`)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pb-10 border-b border-slate-200 mb-12">
      <span className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Teilen</span>
      <div className="flex gap-2">
        <a
          href={`mailto:?subject=${mailSubject}&body=${mailBody}`}
          className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors min-h-[40px] border border-slate-200/50 inline-flex items-center"
        >
          E-Mail
        </a>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors min-h-[40px] border border-slate-200/50"
        >
          {copied ? 'Kopiert!' : 'Link kopieren'}
        </button>
      </div>
    </div>
  )
}
