import type { Metadata } from 'next'
import { getPageBySlug, getSiteSettings } from './payload'

/**
 * Fetches CMS SEO data for a page and merges with hardcoded fallbacks.
 * If CMS is unavailable, returns the fallback metadata unchanged.
 *
 * Usage in page.tsx:
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return getPageSeo('ueber-vcds', { title: 'Über VCDS', description: '...' })
 *   }
 */
export async function getPageSeo(slug: string, fallback: Metadata): Promise<Metadata> {
  try {
    const page = await getPageBySlug(slug)
    if (!page) return fallback

    const seo = (page as { seo?: { metaTitle?: string; metaDescription?: string; ogImage?: { url?: string } | null; noIndex?: boolean } }).seo

    const title = seo?.metaTitle || fallback.title
    const description = seo?.metaDescription || (typeof fallback.description === 'string' ? fallback.description : undefined)

    const result: Metadata = { title, description }

    // OG image from CMS
    if (seo?.ogImage && typeof seo.ogImage === 'object' && seo.ogImage.url) {
      result.openGraph = { images: [{ url: seo.ogImage.url }] }
    }

    // noIndex
    if (seo?.noIndex) {
      result.robots = { index: false, follow: true }
    }

    return result
  } catch {
    return fallback
  }
}

/**
 * Fetches global SEO settings from SiteSettings.
 * Used in layout.tsx for google-site-verification, analytics, etc.
 */
export async function getGlobalSeo() {
  try {
    const settings = await getSiteSettings()
    const seoGlobal = (settings as { seoGlobal?: { googleSiteVerification?: string; bingSiteVerification?: string; siteName?: string; titleSuffix?: string; defaultDescription?: string } }).seoGlobal
    const analytics = (settings as { analytics?: { umamiSiteId?: string; umamiUrl?: string } }).analytics

    return {
      googleSiteVerification: seoGlobal?.googleSiteVerification || '',
      bingSiteVerification: seoGlobal?.bingSiteVerification || '',
      siteName: seoGlobal?.siteName || 'VCDS.de',
      titleSuffix: seoGlobal?.titleSuffix || ' | VCDS.de',
      defaultDescription: seoGlobal?.defaultDescription || '',
      umamiSiteId: analytics?.umamiSiteId || '',
      umamiUrl: analytics?.umamiUrl || '',
    }
  } catch {
    return {
      googleSiteVerification: '',
      bingSiteVerification: '',
      siteName: 'VCDS.de',
      titleSuffix: ' | VCDS.de',
      defaultDescription: '',
      umamiSiteId: '',
      umamiUrl: '',
    }
  }
}
