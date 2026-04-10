import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock next/headers — draftMode().enable() must not throw
vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({ enable: vi.fn() }),
}))

// Mock next/navigation — redirect() throws a special NEXT_REDIRECT error in
// the Next.js runtime. We capture it so we can assert the redirect path.
vi.mock('next/navigation', () => ({
  redirect: vi.fn((path: string) => {
    const err = new Error(`NEXT_REDIRECT:${path}`)
    ;(err as Error & { digest?: string }).digest = `NEXT_REDIRECT;replace;${path};307;`
    throw err
  }),
}))

import { GET } from '@/app/api/draft/route'

const VALID_SECRET = 'super-secret-draft'

function makeRequest(params: Record<string, string>) {
  const url = new URL('/api/draft', 'http://localhost')
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return new NextRequest(url)
}

beforeEach(() => {
  vi.stubEnv('DRAFT_SECRET', VALID_SECRET)
  // Ensure PAYLOAD_SECRET is not used as fallback
  vi.stubEnv('PAYLOAD_SECRET', '')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('GET /api/draft — authentication', () => {
  it('returns 401 when secret is missing', async () => {
    const req = makeRequest({ slug: 'test-page', collection: 'pages' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 when secret is wrong', async () => {
    const req = makeRequest({ secret: 'wrong-secret', slug: 'test-page', collection: 'pages' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })
})

describe('GET /api/draft — collection validation', () => {
  it('returns 400 for disallowed collection "users"', async () => {
    const req = makeRequest({ secret: VALID_SECRET, slug: 'admin', collection: 'users' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for disallowed collection "media"', async () => {
    const req = makeRequest({ secret: VALID_SECRET, slug: 'photo', collection: 'media' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when collection is missing', async () => {
    const req = makeRequest({ secret: VALID_SECRET, slug: 'test-page' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })
})

describe('GET /api/draft — slug validation (open-redirect guard)', () => {
  it('returns 400 for slug starting with // (open-redirect attempt)', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: '//evil.com' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for slug with uppercase characters', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: 'TestPage' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for slug with special characters', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: 'test_page!' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when slug is missing', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for slug with double slash inside', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: 'some//path' })
    const res = await GET(req)
    expect(res.status).toBe(400)
  })
})

describe('GET /api/draft — valid requests redirect correctly', () => {
  it('redirects a pages slug to /<slug>', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: 'produkte' })
    let redirectPath: string | undefined
    try {
      await GET(req)
    } catch (err: unknown) {
      const msg = (err as Error).message
      if (msg.startsWith('NEXT_REDIRECT:')) {
        redirectPath = msg.replace('NEXT_REDIRECT:', '')
      }
    }
    expect(redirectPath).toBe('/produkte')
  })

  it('redirects a posts slug to /blog/<slug>', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'posts', slug: 'mein-beitrag' })
    let redirectPath: string | undefined
    try {
      await GET(req)
    } catch (err: unknown) {
      const msg = (err as Error).message
      if (msg.startsWith('NEXT_REDIRECT:')) {
        redirectPath = msg.replace('NEXT_REDIRECT:', '')
      }
    }
    expect(redirectPath).toBe('/blog/mein-beitrag')
  })

  it('accepts slug with hyphens and digits', async () => {
    const req = makeRequest({ secret: VALID_SECRET, collection: 'pages', slug: 'vcds-25-3-0' })
    let didRedirect = false
    try {
      await GET(req)
    } catch (err: unknown) {
      const msg = (err as Error).message
      if (msg.startsWith('NEXT_REDIRECT:')) {
        didRedirect = true
        expect(msg).toBe('NEXT_REDIRECT:/vcds-25-3-0')
      }
    }
    expect(didRedirect).toBe(true)
  })
})
