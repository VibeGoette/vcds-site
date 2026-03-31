import type { MetadataRoute } from 'next'

const BASE = 'https://vcds-site.vercel.app'

const blogSlugs = [
  'warum-kein-vcds-crack',
  'qual-der-wahl-vcds',
  'fin-verbrauch-bei-vcds',
  'welches-vcds-kaufen',
  'gute-wahl-vcds',
  'update-25-3-1',
  'vorsicht-vor-gefaelschten-vcds-interfaces',
  'zugriffsberechtigungscodes-was-man-wissen-sollte',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ueber-vcds`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/produkte`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/kaufberatung`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/download`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/kontakt`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/quickstart`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/fachhaendler`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fernwartung`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
