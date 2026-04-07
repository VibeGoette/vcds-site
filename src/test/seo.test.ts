import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock payload module
vi.mock('@/lib/payload', () => ({
  getPageBySlug: vi.fn(),
  getSiteSettings: vi.fn(),
}))

import { getPageSeo, getGlobalSeo } from '@/lib/seo'
import { getPageBySlug, getSiteSettings } from '@/lib/payload'

describe('getPageSeo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns fallback when CMS page is null', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(null as never)
    const result = await getPageSeo('test', { title: 'Fallback Title', description: 'Fallback desc' })
    expect(result.title).toBe('Fallback Title')
    expect(result.description).toBe('Fallback desc')
  })

  it('returns fallback on CMS error', async () => {
    vi.mocked(getPageBySlug).mockRejectedValue(new Error('DB down'))
    const result = await getPageSeo('test', { title: 'Fallback' })
    expect(result.title).toBe('Fallback')
  })

  it('prefers CMS metaTitle over fallback', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { metaTitle: 'CMS Title', metaDescription: 'CMS Desc' },
    } as never)
    const result = await getPageSeo('test', { title: 'Fallback', description: 'Fallback desc' })
    expect(result.title).toBe('CMS Title')
    expect(result.description).toBe('CMS Desc')
  })

  it('uses fallback description when CMS has no metaDescription', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { metaTitle: 'CMS Title' },
    } as never)
    const result = await getPageSeo('test', { title: 'Fallback', description: 'Fallback desc' })
    expect(result.title).toBe('CMS Title')
    expect(result.description).toBe('Fallback desc')
  })

  it('sets ogImage from CMS', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { ogImage: { url: '/images/og.png' } },
    } as never)
    const result = await getPageSeo('test', { title: 'Test' })
    expect(result.openGraph).toEqual({ images: [{ url: '/images/og.png' }] })
  })

  it('does not set ogImage when CMS ogImage is null', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { ogImage: null },
    } as never)
    const result = await getPageSeo('test', { title: 'Test' })
    expect(result.openGraph).toBeUndefined()
  })

  it('sets noIndex when CMS says so', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { noIndex: true },
    } as never)
    const result = await getPageSeo('test', { title: 'Test' })
    expect(result.robots).toEqual({ index: false, follow: true })
  })

  it('does not set robots when noIndex is false', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { noIndex: false },
    } as never)
    const result = await getPageSeo('test', { title: 'Test' })
    expect(result.robots).toBeUndefined()
  })

  it('handles page with no seo field at all', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
    } as never)
    const result = await getPageSeo('test', { title: 'Fallback', description: 'Desc' })
    expect(result.title).toBe('Fallback')
    expect(result.description).toBe('Desc')
  })
})

describe('getGlobalSeo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns CMS values when available', async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({
      seoGlobal: {
        googleSiteVerification: 'google-123',
        bingSiteVerification: 'bing-456',
        siteName: 'VCDS Test',
        titleSuffix: ' | Test',
        defaultDescription: 'Default desc',
      },
      analytics: {
        umamiSiteId: 'umami-789',
        umamiUrl: 'https://analytics.test.de/script.js',
      },
    } as never)

    const result = await getGlobalSeo()
    expect(result.googleSiteVerification).toBe('google-123')
    expect(result.bingSiteVerification).toBe('bing-456')
    expect(result.siteName).toBe('VCDS Test')
    expect(result.umamiSiteId).toBe('umami-789')
    expect(result.umamiUrl).toBe('https://analytics.test.de/script.js')
  })

  it('returns defaults on CMS error', async () => {
    vi.mocked(getSiteSettings).mockRejectedValue(new Error('DB unavailable'))
    const result = await getGlobalSeo()
    expect(result.googleSiteVerification).toBe('')
    expect(result.siteName).toBe('VCDS.de')
    expect(result.titleSuffix).toBe(' | VCDS.de')
    expect(result.umamiSiteId).toBe('')
  })

  it('returns defaults when CMS fields are empty', async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({} as never)
    const result = await getGlobalSeo()
    expect(result.googleSiteVerification).toBe('')
    expect(result.siteName).toBe('VCDS.de')
  })
})
