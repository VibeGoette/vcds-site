import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Hoisted mock state ────────────────────────────────────────────────────────
const { revalidatePathMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
}))

import { revalidateCollection, revalidateGlobal } from '@/hooks/revalidate'

// ── Helpers ──

function makeCollectionArg(
  collectionSlug: string,
  docSlug: string,
  status?: string,
) {
  return {
    doc: status !== undefined ? { slug: docSlug, _status: status } : { slug: docSlug },
    collection: { slug: collectionSlug },
    req: {} as never,
    previousDoc: {},
    operation: 'create' as const,
    context: {},
  }
}

beforeEach(() => {
  revalidatePathMock.mockClear()
})

describe('revalidateCollection — posts', () => {
  it('revalidates /blog/<slug> and /blog when a post is published', () => {
    revalidateCollection(makeCollectionArg('posts', 'mein-beitrag', 'published') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/blog/mein-beitrag')
    expect(revalidatePathMock).toHaveBeenCalledWith('/blog')
    expect(revalidatePathMock).toHaveBeenCalledTimes(2)
  })

  it('revalidates when post document has no _status field (treated as published)', () => {
    revalidateCollection(makeCollectionArg('posts', 'ohne-status') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/blog/ohne-status')
    expect(revalidatePathMock).toHaveBeenCalledWith('/blog')
  })

  it('does NOT revalidate when post status is draft', () => {
    revalidateCollection(makeCollectionArg('posts', 'entwurf', 'draft') as never)
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })
})

describe('revalidateCollection — pages', () => {
  it('revalidates /<slug> when a page is published', () => {
    revalidateCollection(makeCollectionArg('pages', 'produkte', 'published') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/produkte')
    expect(revalidatePathMock).toHaveBeenCalledTimes(1)
  })

  it('revalidates /<slug> for a page without _status field', () => {
    revalidateCollection(makeCollectionArg('pages', 'faq') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/faq')
  })

  it('does NOT revalidate when page status is draft', () => {
    revalidateCollection(makeCollectionArg('pages', 'entwurf', 'draft') as never)
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })
})

describe('revalidateCollection — products', () => {
  it('revalidates /produkte when a product changes', () => {
    revalidateCollection(makeCollectionArg('products', 'hex-v2') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/produkte')
    expect(revalidatePathMock).toHaveBeenCalledTimes(1)
  })
})

describe('revalidateCollection — faqs', () => {
  it('revalidates /faq when an FAQ entry changes', () => {
    revalidateCollection(makeCollectionArg('faqs', 'frage-1') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/faq')
  })
})

describe('revalidateCollection — fallback for unknown collection', () => {
  it('revalidates / for an unknown collection slug', () => {
    revalidateCollection(makeCollectionArg('team-members', 'philipp') as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/')
  })
})

describe('revalidateCollection — return value', () => {
  it('returns the original doc unchanged', () => {
    const doc = { slug: 'test', _status: 'published', title: 'Test' }
    const result = revalidateCollection({
      doc,
      collection: { slug: 'pages' },
      req: {} as never,
      previousDoc: {},
      operation: 'create' as const,
      context: {},
    } as never)
    expect(result).toBe(doc)
  })
})

describe('revalidateGlobal', () => {
  it('revalidates the root layout path', () => {
    const doc = { title: 'Site Settings' }
    revalidateGlobal({ doc, req: {} as never, previousDoc: {}, context: {} } as never)
    expect(revalidatePathMock).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates exactly once per call', () => {
    const doc = { color: '#2563eb' }
    revalidateGlobal({ doc, req: {} as never, previousDoc: {}, context: {} } as never)
    expect(revalidatePathMock).toHaveBeenCalledTimes(1)
  })

  it('returns the original doc unchanged', () => {
    const doc = { color: '#2563eb' }
    const result = revalidateGlobal({
      doc,
      req: {} as never,
      previousDoc: {},
      context: {},
    } as never)
    expect(result).toBe(doc)
  })
})
