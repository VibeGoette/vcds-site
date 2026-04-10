/**
 * Tests for sanitizeCss() in src/components/StyleProvider.tsx
 *
 * The sanitizer is blacklist-based and used as defense-in-depth for
 * super-philipp-role input (trusted admin).  These tests pin the current
 * behaviour so a regex typo is caught immediately.
 *
 * Cases where the sanitizer does NOT fully neutralise the input are marked
 * it.skip with an explanation of the bypass.
 */
import { describe, it, expect } from 'vitest'
import { sanitizeCss } from '@/components/StyleProvider'

describe('sanitizeCss — happy path', () => {
  it('passes plain CSS through unchanged', () => {
    const input = '.foo { color: red; font-size: 14px; }'
    expect(sanitizeCss(input)).toBe(input)
  })

  it('passes multi-rule CSS through unchanged', () => {
    const input = '.foo { color: red } .bar { display: flex; gap: 1rem }'
    expect(sanitizeCss(input)).toBe(input)
  })
})

describe('sanitizeCss — @import stripping', () => {
  it('removes @import rule but preserves rest of CSS', () => {
    const input = "@import url('https://evil.com/x.css'); .foo { color: red }"
    const result = sanitizeCss(input)
    expect(result).not.toContain('@import')
    expect(result).toContain('.foo { color: red }')
  })

  it('removes case-insensitive @IMPORT', () => {
    const input = "@IMPORT url('https://evil.com/x.css'); .foo { color: red }"
    const result = sanitizeCss(input)
    expect(result).not.toContain('@IMPORT')
    expect(result).not.toMatch(/@import/i)
  })
})

describe('sanitizeCss — javascript: URL neutralisation', () => {
  it('neutralises javascript: in url()', () => {
    const input = '.foo { background: url(javascript:alert(1)) }'
    const result = sanitizeCss(input)
    expect(result).not.toContain('javascript:')
  })

  it('neutralises mixed-case JaVaScRiPt:', () => {
    const input = '.foo { background: url(JaVaScRiPt:alert(1)) }'
    const result = sanitizeCss(input)
    expect(result).not.toMatch(/javascript:/i)
  })
})

describe('sanitizeCss — expression() stripping', () => {
  it('removes expression(...) from IE-style CSS', () => {
    const input = '.foo { width: expression(alert(1)) }'
    const result = sanitizeCss(input)
    expect(result).not.toContain('expression(')
  })

  it('removes EXPRESSION() case-insensitively', () => {
    const input = '.foo { width: EXPRESSION(alert(1)) }'
    const result = sanitizeCss(input)
    expect(result).not.toMatch(/expression\s*\(/i)
  })

  it('removes expression with whitespace before paren', () => {
    const input = '.foo { width: expression  (alert(1)) }'
    const result = sanitizeCss(input)
    expect(result).not.toMatch(/expression\s*\(/i)
  })
})

describe('sanitizeCss — script tag stripping', () => {
  it('strips <script>...</script> from string content', () => {
    const input = '.foo::before { content: "</style><script>alert(1)</script>" }'
    const result = sanitizeCss(input)
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('</script>')
  })

  it('strips </style> closing tag to prevent early style-block escape', () => {
    const input = '.foo { color: red } </style><script>alert(1)</script>'
    const result = sanitizeCss(input)
    expect(result).not.toContain('</style>')
  })
})

describe('sanitizeCss — mixed benign + malicious', () => {
  it('preserves benign rules while stripping all attack vectors', () => {
    const input = [
      '.header { background: #fff; font-size: 1rem }',
      "@import url('https://evil.com/x.css');",
      '.body { color: expression(document.cookie) }',
      '.nav a { background: url(javascript:void(0)) }',
      '.footer { margin: 0 auto }',
    ].join('\n')

    const result = sanitizeCss(input)

    // Benign rules survive
    expect(result).toContain('.header { background: #fff; font-size: 1rem }')
    expect(result).toContain('.footer { margin: 0 auto }')

    // Attack vectors are gone
    expect(result).not.toMatch(/@import/i)
    expect(result).not.toMatch(/expression\s*\(/i)
    expect(result).not.toMatch(/javascript:/i)
  })
})

// ─── Known bypass: </style> tag without <script> is NOT stripped ────────────
// The sanitizer removes `</style>` ONLY when it appears standalone (line 11:
// `.replace(/<\/style>/gi, '')`). However the `<script>` regex requires a
// matching `<script...>` opening tag. A bare `</style>` DOES get removed.
// Tests below confirm the current behaviour (standalone </style> is stripped).
describe('sanitizeCss — </style> handling', () => {
  it('removes standalone </style> to prevent early tag close', () => {
    const input = '.foo { color: red } </style> <h1>injected</h1>'
    const result = sanitizeCss(input)
    expect(result).not.toContain('</style>')
  })
})

// ─── Known bypass: HTML entities are NOT decoded before matching ─────────────
// e.g. "&#106;avascript:" or "java\0script:" may slip past the regex.
// These are low-risk because: (a) CSS is trusted-admin-only, (b) browsers
// don't decode HTML entities inside <style> blocks.
// Documented here for future review but NOT skipped — just noted as out-of-scope.
