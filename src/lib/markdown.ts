/**
 * Lightweight Markdown-to-HTML renderer for changelogs and update posts.
 * Supports: headings, lists, bold, italic, inline code, code blocks, links, paragraphs, horizontal rules, blockquotes.
 * No external dependencies needed.
 */

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/^-|-$/g, '')
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-[13px] font-mono">$1</code>')
  out = out.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>')
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    const safeUrl = /^(https?:\/\/|mailto:)/i.test(url) ? url : '#'
    return `<a href="${safeUrl}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`
  })
  return out
}

export function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  const html: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') { i++; continue }

    if (/^---+$/.test(line.trim())) {
      html.push('<hr class="my-8 border-slate-200" />')
      i++; continue
    }

    if (line.trim().startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      i++
      html.push(`<pre class="bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono leading-relaxed"><code>${codeLines.join('\n')}</code></pre>`)
      continue
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = inlineMarkdown(headingMatch[2])
      const id = slugify(headingMatch[2])
      const styles: Record<number, string> = {
        1: 'text-2xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight',
        2: 'text-xl font-extrabold text-slate-900 mt-8 mb-3 tracking-tight',
        3: 'text-lg font-bold text-slate-800 mt-6 mb-2',
        4: 'text-base font-bold text-slate-700 mt-4 mb-2',
      }
      html.push(`<h${level} id="${id}" class="${styles[level]}">${text}</h${level}>`)
      i++; continue
    }

    if (/^[-*+]\s/.test(line.trim())) {
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s/.test(lines[i].trim())) {
        items.push(inlineMarkdown(lines[i].trim().replace(/^[-*+]\s/, '')))
        i++
      }
      html.push(`<ul class="my-4 space-y-1.5 ml-1">${items.map(item => `<li class="flex gap-2 text-[17px] text-slate-600 leading-relaxed"><span class="text-blue-500 mt-1.5 shrink-0">•</span><span>${item}</span></li>`).join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(inlineMarkdown(lines[i].trim().replace(/^\d+\.\s/, '')))
        i++
      }
      html.push(`<ol class="my-4 space-y-1.5 ml-1">${items.map((item, idx) => `<li class="flex gap-2 text-[17px] text-slate-600 leading-relaxed"><span class="text-blue-500 font-bold shrink-0 w-6">${idx + 1}.</span><span>${item}</span></li>`).join('')}</ol>`)
      continue
    }

    if (line.trim().startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      html.push(`<blockquote class="border-l-4 border-blue-500 pl-5 my-6 py-2 text-slate-600 italic">${quoteLines.map(l => `<p>${inlineMarkdown(l)}</p>`).join('')}</blockquote>`)
      continue
    }

    html.push(`<p class="text-[17px] text-slate-600 leading-[1.85] my-4">${inlineMarkdown(line)}</p>`)
    i++
  }

  return html.join('\n')
}

/** Extract headings from Markdown for Table of Contents */
export function extractMarkdownHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  for (const line of content.split('\n')) {
    const match = line.match(/^(#{1,4})\s+(.+)/)
    if (match) {
      headings.push({ id: slugify(match[2]), text: match[2], level: match[1].length })
    }
  }
  return headings
}
