/**
 * Canonical base URL for the site. Used for metadata, canonicals, sitemap, robots,
 * and structured data. Reads NEXT_PUBLIC_SITE_URL with a production fallback so
 * preview deployments should set the env var explicitly to their preview domain.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vcds.de'
  return raw.replace(/\/$/, '')
}

export const SITE_URL = getSiteUrl()
