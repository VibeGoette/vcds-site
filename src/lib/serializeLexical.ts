/**
 * Lexical rich text serializers — plain text + HTML output.
 * Used for FAQ answers (text), blog posts (HTML), and reading time calculation.
 */

import { escapeHtml } from '@/lib/utils'
import { slugifyHeading as slugify } from '@/lib/slug'

interface LexicalNode {
  type: string
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  url?: string
  children?: LexicalNode[]
}

interface LexicalRichText {
  root?: { children: LexicalNode[] }
}

// ── Plain text extraction ──

export function lexicalToText(richText: LexicalRichText | null | undefined): string {
  if (!richText?.root?.children) return ''
  return extractText(richText.root.children)
}

function extractText(nodes: LexicalNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') return node.text ?? ''
      if (node.type === 'linebreak') return '\n'
      if (node.type === 'link') return extractText(node.children ?? [])
      if (node.children) {
        const inner = extractText(node.children)
        if (node.type === 'paragraph') return inner + '\n'
        if (node.type === 'listitem') return '• ' + inner + '\n'
        return inner
      }
      return ''
    })
    .join('')
    .trim()
}

// ── HTML serialization ──

function serializeInline(nodes: LexicalNode[]): string {
  return nodes.map((node) => {
    if (node.type === 'linebreak') return '<br/>'
    if (node.type === 'text') {
      let html = escapeHtml(node.text ?? '')
      const fmt = typeof node.format === 'number' ? node.format : 0
      if (fmt & 1) html = `<strong>${html}</strong>`
      if (fmt & 2) html = `<em>${html}</em>`
      if (fmt & 8) html = `<s>${html}</s>`
      if (fmt & 16) html = `<code class="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-[13px] font-mono">${html}</code>`
      if (fmt & 32) html = `<sub>${html}</sub>`
      if (fmt & 64) html = `<sup>${html}</sup>`
      return html
    }
    if (node.type === 'link') {
      const url = node.url ?? '#'
      const safeUrl = /^(https?:\/\/|mailto:|\/)/i.test(url) ? url : '#'
      const inner = serializeInline(node.children ?? [])
      return `<a href="${escapeHtml(safeUrl)}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${inner}</a>`
    }
    if (node.children) return serializeInline(node.children)
    return ''
  }).join('')
}

function uniqueId(base: string, usedIds: Set<string>): string {
  let id = base
  let counter = 1
  while (usedIds.has(id)) {
    id = `${base}-${counter++}`
  }
  usedIds.add(id)
  return id
}

function serializeNodes(nodes: LexicalNode[], usedIds?: Set<string>): string {
  const ids = usedIds ?? new Set<string>()
  const html: string[] = []

  for (const node of nodes) {
    switch (node.type) {
      case 'paragraph': {
        const inner = serializeInline(node.children ?? [])
        if (inner.trim()) html.push(`<p class="text-[17px] text-slate-600 leading-[1.85] my-4">${inner}</p>`)
        break
      }
      case 'heading': {
        const level = node.tag ?? 'h2'
        const inner = serializeInline(node.children ?? [])
        const plainText = extractText(node.children ?? [])
        const id = uniqueId(slugify(plainText), ids)
        const styles: Record<string, string> = {
          h1: 'text-2xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight',
          h2: 'text-xl font-extrabold text-slate-900 mt-8 mb-3 tracking-tight',
          h3: 'text-lg font-bold text-slate-800 mt-6 mb-2',
          h4: 'text-base font-bold text-slate-700 mt-4 mb-2',
        }
        html.push(`<${level} id="${id}" class="${styles[level] ?? styles.h2}">${inner}</${level}>`)
        break
      }
      case 'list': {
        const isOrdered = node.listType === 'number'
        const tag = isOrdered ? 'ol' : 'ul'
        const items = (node.children ?? []).map((li, idx) => {
          const inner = serializeInline(li.children ?? [])
          if (isOrdered) {
            return `<li class="flex gap-2 text-[17px] text-slate-600 leading-relaxed"><span class="text-blue-500 font-bold shrink-0 w-6">${idx + 1}.</span><span>${inner}</span></li>`
          }
          return `<li class="flex gap-2 text-[17px] text-slate-600 leading-relaxed"><span class="text-blue-500 mt-1.5 shrink-0">•</span><span>${inner}</span></li>`
        }).join('')
        html.push(`<${tag} class="my-4 space-y-1.5 ml-1">${items}</${tag}>`)
        break
      }
      case 'quote': {
        const inner = serializeNodes(node.children ?? [], ids)
        html.push(`<blockquote class="border-l-4 border-blue-500 pl-5 my-6 py-2 text-slate-600 italic">${inner}</blockquote>`)
        break
      }
      case 'horizontalrule': {
        html.push('<hr class="my-8 border-slate-200" />')
        break
      }
      default: {
        if (node.children) html.push(serializeNodes(node.children, ids))
        break
      }
    }
  }

  return html.join('\n')
}

/** Convert Lexical rich text JSON to styled HTML */
export function lexicalToHtml(richText: LexicalRichText | null | undefined): string {
  if (!richText?.root?.children) return ''
  return serializeNodes(richText.root.children)
}

/** Extract headings from Lexical JSON for Table of Contents */
export function extractLexicalHeadings(richText: LexicalRichText | null | undefined): Array<{ id: string; text: string; level: number }> {
  if (!richText?.root?.children) return []
  const headings: Array<{ id: string; text: string; level: number }> = []
  for (const node of richText.root.children) {
    if (node.type === 'heading') {
      const text = extractText(node.children ?? [])
      const level = parseInt((node.tag ?? 'h2').replace('h', ''), 10)
      headings.push({ id: slugify(text), text, level })
    }
  }
  return headings
}
