/**
 * Tests for the security headers exported from src/lib/security-headers.mjs.
 *
 * next.config.mjs delegates to buildHeaders() from that module so we can test
 * the headers without importing withPayload() from @payloadcms/next. The file
 * is .mjs (plain JS with JSDoc types) because Node's ESM loader can't transpile
 * TypeScript when loading next.config.mjs. The explicit .mjs extension in the
 * import is required by TypeScript's bundler moduleResolution.
 */
import { describe, it, expect } from 'vitest'
import {
  securityHeaders,
  publicCsp,
  PUBLIC_ROUTES_REGEX,
  buildHeaders,
} from '@/lib/security-headers.mjs'

// ── securityHeaders ──────────────────────────────────────────────────────────

describe('securityHeaders — baseline entries', () => {
  it('contains Strict-Transport-Security with correct value', () => {
    const hsts = securityHeaders.find((h) => h.key === 'Strict-Transport-Security')
    expect(hsts).toBeDefined()
    expect(hsts!.value).toBe('max-age=31536000; includeSubDomains')
  })

  it('contains X-Content-Type-Options: nosniff', () => {
    const h = securityHeaders.find((h) => h.key === 'X-Content-Type-Options')
    expect(h).toBeDefined()
    expect(h!.value).toBe('nosniff')
  })

  it('contains X-Frame-Options: DENY', () => {
    const h = securityHeaders.find((h) => h.key === 'X-Frame-Options')
    expect(h).toBeDefined()
    expect(h!.value).toBe('DENY')
  })

  it('contains Referrer-Policy: strict-origin-when-cross-origin', () => {
    const h = securityHeaders.find((h) => h.key === 'Referrer-Policy')
    expect(h).toBeDefined()
    expect(h!.value).toBe('strict-origin-when-cross-origin')
  })

  it('contains Permissions-Policy with camera, microphone, geolocation disabled', () => {
    const h = securityHeaders.find((h) => h.key === 'Permissions-Policy')
    expect(h).toBeDefined()
    expect(h!.value).toContain('camera=()')
    expect(h!.value).toContain('microphone=()')
    expect(h!.value).toContain('geolocation=()')
  })
})

// ── publicCsp ────────────────────────────────────────────────────────────────

describe('publicCsp — required directives', () => {
  it("contains default-src 'self'", () => {
    expect(publicCsp).toContain("default-src 'self'")
  })

  it("contains frame-ancestors 'none'", () => {
    expect(publicCsp).toContain("frame-ancestors 'none'")
  })

  it('allows https://challenges.cloudflare.com for Turnstile', () => {
    expect(publicCsp).toContain('https://challenges.cloudflare.com')
  })

  it('does not allow all frames (object-src none)', () => {
    expect(publicCsp).toContain("object-src 'none'")
  })

  it("contains base-uri 'self' to prevent base-tag injection", () => {
    expect(publicCsp).toContain("base-uri 'self'")
  })
})

// ── PUBLIC_ROUTES_REGEX ──────────────────────────────────────────────────────

describe('PUBLIC_ROUTES_REGEX — source string', () => {
  it('is exactly /((?!admin|api).*)', () => {
    // Pin the exact string — a typo here would silently break admin or public CSP.
    expect(PUBLIC_ROUTES_REGEX).toBe('/((?!admin|api).*)')
  })

  it('contains the negative-lookahead for admin', () => {
    expect(PUBLIC_ROUTES_REGEX).toContain('(?!admin')
  })

  it('contains the negative-lookahead for api', () => {
    expect(PUBLIC_ROUTES_REGEX).toContain('api)')
  })

  it('starts with / and uses a capturing group', () => {
    // Next.js path-matcher semantics: source is used by Next.js path-to-regexp,
    // not evaluated as a raw JS RegExp against the full URL.  We just verify
    // the structural shape so a partial rewrite is caught.
    expect(PUBLIC_ROUTES_REGEX).toMatch(/^\/\(/)
    expect(PUBLIC_ROUTES_REGEX).toMatch(/\.\*\)$/)
  })

  // ── Regex behaviour when used as a JavaScript RegExp ─────────────────────
  // NOTE: Next.js applies this source as a path-to-regexp pattern against path
  // segments, NOT as a raw JS RegExp.test() against the full path string.
  // The tests below use the regex AFTER stripping the leading "/" to mirror how
  // Next.js extracts the path portion for matching.
  it('matches public path segments (without leading /)', () => {
    // Next.js tests the path portion after the leading "/"
    const segmentRe = new RegExp('^(?!admin|api).*$')
    expect(segmentRe.test('produkte')).toBe(true)
    expect(segmentRe.test('blog/some-post')).toBe(true)
    expect(segmentRe.test('')).toBe(true) // root
  })

  it('does NOT match admin path segments', () => {
    const segmentRe = new RegExp('^(?!admin|api).*$')
    expect(segmentRe.test('admin')).toBe(false)
    expect(segmentRe.test('admin/collections')).toBe(false)
  })

  it('does NOT match api path segments', () => {
    const segmentRe = new RegExp('^(?!admin|api).*$')
    expect(segmentRe.test('api')).toBe(false)
    expect(segmentRe.test('api/contact')).toBe(false)
  })
})

// ── buildHeaders ─────────────────────────────────────────────────────────────

describe('buildHeaders() — structure', () => {
  it('returns exactly 2 entries', () => {
    const result = buildHeaders()
    expect(result).toHaveLength(2)
  })

  it('first entry covers /:path* with securityHeaders', () => {
    const [first] = buildHeaders()
    expect(first.source).toBe('/:path*')
    expect(first.headers).toEqual(securityHeaders)
  })

  it('second entry covers the public-routes regex with CSP-Report-Only', () => {
    const [, second] = buildHeaders()
    expect(second.source).toBe(PUBLIC_ROUTES_REGEX)
    const cspHeader = second.headers.find((h) => h.key === 'Content-Security-Policy-Report-Only')
    expect(cspHeader).toBeDefined()
    expect(cspHeader!.value).toBe(publicCsp)
  })

  it('second entry has exactly one header (CSP only)', () => {
    const [, second] = buildHeaders()
    expect(second.headers).toHaveLength(1)
  })

  it('does not ship Content-Security-Policy (enforced) — only Report-Only', () => {
    for (const entry of buildHeaders()) {
      for (const h of entry.headers) {
        expect(h.key).not.toBe('Content-Security-Policy')
      }
    }
  })
})
