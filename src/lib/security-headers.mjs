/**
 * Security headers for next.config.mjs.
 *
 * This file is plain JavaScript (not TypeScript) because next.config.mjs runs
 * in Node's ESM loader, which does not transpile TypeScript. Tests import it
 * via the `@/lib/security-headers` path alias which Vitest resolves to this
 * `.mjs` file through the bundler-style moduleResolution in tsconfig.json.
 *
 * JSDoc type annotations give editor support without requiring a .d.ts file.
 */

/**
 * @typedef {{ key: string; value: string }} HeaderEntry
 */

/**
 * Baseline security headers applied to every response (incl. /admin and /api).
 * @type {HeaderEntry[]}
 */
export const securityHeaders = [
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
 * @returns {Array<{ source: string; headers: HeaderEntry[] }>}
 */
export function buildHeaders() {
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
