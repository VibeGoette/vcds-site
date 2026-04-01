import { describe, it, expect } from 'vitest'
import { lexicalToHtml, extractLexicalHeadings } from '../lib/serializeLexical'

describe('lexicalToHtml', () => {
  it('returns empty string for null', () => {
    expect(lexicalToHtml(null)).toBe('')
    expect(lexicalToHtml(undefined)).toBe('')
  })

  it('returns empty string for empty root', () => {
    expect(lexicalToHtml({ root: { children: [] } })).toBe('')
  })

  it('renders paragraph', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Hello' }] }] }
    })
    expect(html).toContain('<p')
    expect(html).toContain('Hello')
  })

  it('escapes HTML in text', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'paragraph', children: [{ type: 'text', text: '<script>alert("xss")</script>' }] }] }
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('renders heading with id', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'My Heading' }] }] }
    })
    expect(html).toContain('id="my-heading"')
    expect(html).toContain('<h2')
    expect(html).toContain('My Heading')
  })

  it('generates unique IDs for duplicate headings', () => {
    const html = lexicalToHtml({
      root: { children: [
        { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Setup' }] },
        { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Setup' }] },
      ]}
    })
    expect(html).toContain('id="setup"')
    expect(html).toContain('id="setup-1"')
  })

  it('renders bold and italic text', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'paragraph', children: [
        { type: 'text', text: 'bold', format: 1 },
        { type: 'text', text: 'italic', format: 2 },
      ]}]}
    })
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>italic</em>')
  })

  it('blocks javascript: URLs in links', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'paragraph', children: [
        { type: 'link', url: 'javascript:alert(1)', children: [{ type: 'text', text: 'click' }] }
      ]}]}
    })
    expect(html).toContain('href="#"')
    expect(html).not.toContain('javascript:')
  })

  it('renders unordered list', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'list', listType: 'bullet', children: [
        { type: 'listitem', children: [{ type: 'text', text: 'Item A' }] },
        { type: 'listitem', children: [{ type: 'text', text: 'Item B' }] },
      ]}]}
    })
    expect(html).toContain('<ul')
    expect(html).toContain('Item A')
    expect(html).toContain('Item B')
  })

  it('handles unknown node types gracefully', () => {
    const html = lexicalToHtml({
      root: { children: [{ type: 'custom-unknown', children: [{ type: 'text', text: 'inner' }] }] }
    })
    // Should not crash, may render inner content
    expect(typeof html).toBe('string')
  })
})

describe('extractLexicalHeadings', () => {
  it('returns empty for null', () => {
    expect(extractLexicalHeadings(null)).toEqual([])
  })

  it('extracts h2 and h3 headings', () => {
    const headings = extractLexicalHeadings({
      root: { children: [
        { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'First' }] },
        { type: 'paragraph', children: [{ type: 'text', text: 'text' }] },
        { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Second' }] },
      ]}
    })
    expect(headings).toHaveLength(2)
    expect(headings[0]).toEqual({ id: 'first', text: 'First', level: 2 })
    expect(headings[1]).toEqual({ id: 'second', text: 'Second', level: 3 })
  })

  it('handles headings with special characters', () => {
    const headings = extractLexicalHeadings({
      root: { children: [
        { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Über VCDS & mehr!' }] },
      ]}
    })
    expect(headings[0].id).toBe('über-vcds-mehr')
  })
})
