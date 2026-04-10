/**
 * Security headers extracted from next.config.mjs so they can be unit-tested
 * without importing withPayload() from @payloadcms/next.
 */

export type HeaderEntry = { key: string; value: string }

/** Baseline security headers applied to every response (incl. /admin and /api). */
export const securityHeaders: HeaderEntry[] = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/**
 * Strict CSP for public pages only. Shipped as Report-Only so analytics
 * (Umami URL is editable in SiteSettings) and rarely-touched paths do not
 * break silently. Excludes /admin and /api so the Payload editor keeps working.
 */
export const publicCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.livechatinc.com https://*.livechat-static.com https:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://*.livechatinc.com https://*.livechat-static.com https:",
  "frame-src 'self' https://www.youtube-nocookie.com https://challenges.cloudflare.com https://*.livechatinc.com",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

/** The regex source used in headers() to match public (non-admin, non-api) routes. */
export const PUBLIC_ROUTES_REGEX = '/((?!admin|api).*)'

/**
 * Returns the Next.js headers() array.
 * Extracted so it can be tested without calling withPayload().
 */
export function buildHeaders(): Array<{ source: string; headers: HeaderEntry[] }> {
  return [
    // Baseline security headers on every route (incl. /admin and /api).
    {
      source: '/:path*',
      headers: securityHeaders,
    },
    // Strict CSP (Report-Only) on public routes only.
    {
      source: PUBLIC_ROUTES_REGEX,
      headers: [
        { key: 'Content-Security-Policy-Report-Only', value: publicCsp },
      ],
    },
  ]
}
