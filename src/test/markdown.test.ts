import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '@/lib/markdown'

describe('renderMarkdown', () => {
  it('renders a paragraph', () => {
    const html = renderMarkdown('Hello World')
    expect(html).toContain('Hello World')
    expect(html).toContain('<p')
  })

  it('renders headings', () => {
    const html = renderMarkdown('## Heading 2\n\n### Heading 3')
    expect(html).toContain('<h2')
    expect(html).toContain('Heading 2')
    expect(html).toContain('<h3')
    expect(html).toContain('Heading 3')
  })

  it('renders unordered lists', () => {
    const html = renderMarkdown('- Item A\n- Item B\n- Item C')
    expect(html).toContain('<ul')
    expect(html).toContain('Item A')
    expect(html).toContain('Item C')
  })

  it('renders bold and italic', () => {
    const html = renderMarkdown('This is **bold** and *italic*')
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>italic</em>')
  })

  it('renders inline code', () => {
    const html = renderMarkdown('Use `npm install` to start')
    expect(html).toContain('<code')
    expect(html).toContain('npm install')
  })

  it('renders code blocks', () => {
    const html = renderMarkdown('```\nconst x = 1\n```')
    expect(html).toContain('<pre')
    expect(html).toContain('const x = 1')
  })

  it('renders horizontal rules', () => {
    const html = renderMarkdown('Before\n\n---\n\nAfter')
    expect(html).toContain('<hr')
  })

  it('escapes HTML to prevent XSS', () => {
    const html = renderMarkdown('<script>alert("xss")</script>')
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('renders links', () => {
    const html = renderMarkdown('[VCDS](https://vcds.de)')
    expect(html).toContain('<a href="https://vcds.de"')
    expect(html).toContain('VCDS')
  })

  it('renders ordered lists', () => {
    const html = renderMarkdown('1. First\n2. Second\n3. Third')
    expect(html).toContain('<ol')
    expect(html).toContain('First')
    expect(html).toContain('Third')
  })

  it('renders blockquotes', () => {
    const html = renderMarkdown('> Important quote')
    expect(html).toContain('<blockquote')
    expect(html).toContain('Important quote')
  })

  it('handles bold+italic combo', () => {
    const html = renderMarkdown('This is ***bold italic***')
    expect(html).toContain('<strong><em>bold italic</em></strong>')
  })
})
