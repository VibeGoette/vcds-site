import { describe, it, expect } from 'vitest'
import { lexicalToText } from '@/lib/serializeLexical'

describe('lexicalToText', () => {
  it('returns empty string for null/undefined', () => {
    expect(lexicalToText(null)).toBe('')
    expect(lexicalToText(undefined)).toBe('')
    expect(lexicalToText({})).toBe('')
  })

  it('extracts text from a simple paragraph', () => {
    const richText = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Hello World' },
            ],
          },
        ],
      },
    }
    expect(lexicalToText(richText)).toBe('Hello World')
  })

  it('handles multiple paragraphs', () => {
    const richText = {
      root: {
        children: [
          { type: 'paragraph', children: [{ type: 'text', text: 'First paragraph.' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Second paragraph.' }] },
        ],
      },
    }
    expect(lexicalToText(richText)).toBe('First paragraph.\nSecond paragraph.')
  })

  it('handles nested text with links', () => {
    const richText = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Visit ' },
              { type: 'link', children: [{ type: 'text', text: 'our site' }] },
              { type: 'text', text: ' for more.' },
            ],
          },
        ],
      },
    }
    expect(lexicalToText(richText)).toBe('Visit our site for more.')
  })

  it('handles list items', () => {
    const richText = {
      root: {
        children: [
          {
            type: 'list',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Item 1' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Item 2' }] },
            ],
          },
        ],
      },
    }
    const result = lexicalToText(richText)
    expect(result).toContain('Item 1')
    expect(result).toContain('Item 2')
  })

  it('handles linebreaks', () => {
    const richText = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Line 1' },
              { type: 'linebreak' },
              { type: 'text', text: 'Line 2' },
            ],
          },
        ],
      },
    }
    expect(lexicalToText(richText)).toBe('Line 1\nLine 2')
  })
})
