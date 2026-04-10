/**
 * SEC-09: Host allowlist for externally loaded analytics scripts.
 *
 * The Umami analytics URL is editable via the CMS Admin Panel (SiteSettings →
 * Analytics). Without validation, a compromised admin account could inject an
 * arbitrary JavaScript URL as `<script src>`, turning CMS write access into
 * full XSS on every page. This guard rejects any URL that isn't (a) valid,
 * (b) HTTPS, and (c) hosted on a known analytics domain.
 *
 * To add a self-hosted Umami instance, set the `UMAMI_ALLOWED_HOSTS` env var
 * to a comma-separated list of hostnames (e.g. `analytics.example.com,stats.example.com`).
 */

const DEFAULT_ALLOWED_HOSTS = [
  'umami.is',
  'cloud.umami.is',
  'analytics.vcds.de',
]

function getAllowedHosts(): Set<string> {
  const fromEnv = process.env.UMAMI_ALLOWED_HOSTS
    ?.split(',')
    .map((h) => h.trim())
    .filter(Boolean) ?? []
  return new Set([...DEFAULT_ALLOWED_HOSTS, ...fromEnv])
}

/**
 * Returns true iff `url` is a valid HTTPS URL whose hostname matches (exactly
 * or as a subdomain) one of the allowed analytics hosts.
 */
export function isAllowedAnalyticsUrl(url: string | undefined | null): boolean {
  if (!url) return false
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return false
  }
  if (parsed.protocol !== 'https:') return false
  const allowed = getAllowedHosts()
  for (const host of allowed) {
    if (parsed.hostname === host || parsed.hostname.endsWith('.' + host)) {
      return true
    }
  }
  return false
}
