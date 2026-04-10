import { withPayload } from '@payloadcms/next/withPayload'

// Baseline security headers applied to every response. CSP is handled
// separately below because the Payload admin panel (Lexical rich-text editor)
// needs 'unsafe-eval', which the strict public CSP forbids.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

// Strict CSP for public pages. Shipped as Report-Only so CMS-driven analytics
// (Umami URL is editable in SiteSettings) and rarely-touched paths do not
// break silently. Flip to Content-Security-Policy once violation reports are
// clean. 'unsafe-inline' for scripts is required by Next.js inline hydration
// and the JSON-LD structured-data blocks; a nonce-based CSP is a follow-up.
const publicCsp = [
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/die-vcds-de-user-map',
        destination: '/usermap',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // Baseline security headers on every route (incl. /admin and /api).
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Strict CSP (Report-Only) on public routes only — excludes /admin and /api
      // so the Payload admin panel / Lexical editor keep working.
      {
        source: '/((?!admin|api).*)',
        headers: [
          { key: 'Content-Security-Policy-Report-Only', value: publicCsp },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
