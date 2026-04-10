import type { MetadataRoute } from 'next'
import { getPosts, getPages } from '@/lib/payload'
import { SITE_URL as BASE } from '@/lib/site-url'

/** Hardcoded blog slugs as fallback when CMS is unavailable */
const fallbackBlogSlugs = [
  'warum-kein-vcds-crack',
  'qual-der-wahl-vcds',
  'fin-verbrauch-bei-vcds',
  'welches-vcds-kaufen',
  'gute-wahl-vcds',
  'update-25-3-1',
  'vorsicht-vor-gefaelschten-vcds-interfaces',
  'zugriffsberechtigungscodes-was-man-wissen-sollte',
]

/** Static pages with SEO priorities */
const staticPages: MetadataRoute.Sitemap = [
  { url: BASE, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE}/ueber-vcds`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/produkte`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/kaufberatung`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/download`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/kontakt`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE}/quickstart`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/fachhaendler`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/upgrade`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/fernwartung`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${BASE}/ahk-codieren`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/usermap`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/troubleshooting`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // Try to fetch dynamic blog posts from CMS
  let blogPages: MetadataRoute.Sitemap
  try {
    const posts = await getPosts()
    if (posts.length > 0) {
      blogPages = posts.map(post => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.updatedAt ?? now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    } else {
      blogPages = fallbackBlogSlugs.map(slug => ({
        url: `${BASE}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch {
    blogPages = fallbackBlogSlugs.map(slug => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  }

  // Try to fetch additional CMS pages (beyond hardcoded static pages)
  let dynamicPages: MetadataRoute.Sitemap = []
  try {
    const cmsPages = await getPages()
    const staticSlugs = new Set(['startseite', 'ueber-vcds', 'produkte', 'kaufberatung', 'blog', 'faq', 'download', 'kontakt', 'quickstart', 'fachhaendler', 'upgrade', 'fernwartung', 'ahk-codieren', 'usermap', 'troubleshooting', 'impressum', 'datenschutz'])
    dynamicPages = cmsPages
      .filter(p => !staticSlugs.has(p.slug))
      .map(p => ({
        url: `${BASE}/${p.slug}`,
        lastModified: p.updatedAt ?? now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
  } catch {
    // CMS unavailable — skip dynamic pages
  }

  // Stamp all static pages with current time
  const stampedStatic = staticPages.map(p => ({ ...p, lastModified: now }))

  return [...stampedStatic, ...blogPages, ...dynamicPages]
}
