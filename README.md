# VCDS.de

Official website for VCDS (VAG-COM Diagnostic System), operated by Auto-Intern GmbH (Bochum) for Ross-Tech, LLC. Built as a Next.js 15 + Payload CMS 3 monorepo — public frontend and CMS admin in a single repo, deployed on Vercel.

## Tech Stack

- **Next.js** 15.4.11 (App Router, Server Components)
- **React** 19
- **Payload CMS** 3.82.1 (embedded, SQLite/Turso)
- **TypeScript** 5.x (strict)
- **Tailwind CSS** 3.4
- **Vitest** 4.x + Testing Library + jsdom
- **Resend** (contact form email)
- **Cloudflare Turnstile** (contact form bot protection)
- **GitHub Actions** CI + Dependabot
- **Vercel** (production deploy)

## Getting Started

```bash
cp .env.example .env.local   # fill in at minimum PAYLOAD_SECRET
npm install
npm run dev                   # http://localhost:3000
# First visit /admin to create the initial admin user
```

Run tests:
```bash
npm run test
```

Production build:
```bash
npm run build
```

## Project Structure

```
src/
  app/
    (app)/          # 19 public-facing routes (see CMS section for list)
    (payload)/      # Payload admin panel (/admin)
    api/            # contact, draft, exit-draft, health, update, [...slug]
  collections/      # 11 Payload collections
  globals/          # 4 Payload globals
  blocks/           # 14 block definitions (4 deprecated, 10 active)
  components/       # UI, layout, block renderers, admin components
  fields/           # Reusable Payload field definitions (slug, seo)
  hooks/            # afterChange revalidation hooks
  lib/              # CMS access, color utils, SEO helpers, serializers
  test/             # 16 Vitest test files (~227 tests)
```

See `CLAUDE.md` for a full annotated tree with component-level detail.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PAYLOAD_SECRET` | Yes | Min. 32 chars — DB encryption + JWT signing |
| `DATABASE_URI` | Yes | `file:./data/database.db` (dev) or Turso `libsql://` (prod) |
| `TURSO_AUTH_TOKEN` | Prod | Turso database auth token |
| `SITE_URL` | Yes | e.g. `https://vcds.de` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Same as above (client-accessible) |
| `DRAFT_SECRET` | Recommended | Separate secret for preview URLs; falls back to `PAYLOAD_SECRET` |
| `TURNSTILE_SECRET_KEY` | Prod | Cloudflare Turnstile server-side key (contact form, fail-closed in prod) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Prod | Cloudflare Turnstile public site key |
| `RESEND_API_KEY` | Optional | Resend API key for contact form email delivery |
| `RESEND_DOMAIN` | Optional | e.g. `vcds.de` |
| `CONTACT_EMAIL_TO` | Optional | Destination address for contact submissions |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional | Umami analytics site ID |
| `NEXT_PUBLIC_UMAMI_URL` | Optional | Umami script URL |
| `UMAMI_ALLOWED_HOSTS` | Optional | Additional allowed hosts for Umami script CSP |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash Redis for distributed rate-limiting (falls back to in-memory) |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Upstash Redis auth token |

See `.env.example` for comments and defaults.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Next.js development server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run seed` | Seed database with initial data (`src/seed.ts`) |
| `npm run test` | Run all Vitest tests (single pass) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run generate:types` | Regenerate Payload TypeScript types |
| `npm run payload` | Run Payload CLI directly |

## Testing

- **Framework:** Vitest + Testing Library + jsdom
- **Test files:** 16 files in `src/test/`
- **Approximate test count:** ~227 tests
- **Run:** `npm run test`

Critical paths covered: API routes (contact, draft, update), access control, CSS sanitizer, German date parser, Lexical serializer, Markdown renderer, structured data, security headers, revalidation hooks, contact form validation, blog utilities, SEO metadata.

## CI / CD

**GitHub Actions** (`.github/workflows/ci.yml`) runs on every push and on PRs targeting `main`:
1. `npx tsc --noEmit` — type check
2. `npm run test` — full test suite
3. `npm audit --audit-level=high --production` — security audit (non-blocking)
4. `npm run build` — production build

**Dependabot** (`.github/dependabot.yml`) runs weekly (Monday 06:00 CET):
- Groups all minor + patch bumps into a single PR
- Ignores major version bumps for `next`, `react`, `react-dom`, `payload`, `@payloadcms/*`
- Covers both npm packages and GitHub Actions

**Vercel**: auto-deploys `main` to production. No additional config needed for preview deployments.

## Security

- **Headers** (`src/lib/security-headers.mjs`): HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo disabled), `Content-Security-Policy-Report-Only` on public routes.
- **Rate limiting**: in-memory `Map` by default; configure `UPSTASH_REDIS_REST_URL` + token for persistent distributed limiting across Vercel instances.
- **Contact form**: Cloudflare Turnstile (bot protection) + honeypot field + timing check. In production, submissions without a valid Turnstile token are rejected (fail-closed).
- **Secrets**: `PAYLOAD_SECRET` must be at least 32 characters. `DRAFT_SECRET` should differ from `PAYLOAD_SECRET`. Never commit `.env.local`.

## Accessibility

Audited surfaces target WCAG 2.1 AA: keyboard navigation, `focus-visible` rings, ARIA roles and labels, 44 px minimum touch targets, `prefers-reduced-motion` support, focus trap in CookieBanner.

## CMS

Admin panel at `/admin`. On first run, create an admin user and save credentials securely.

### Collections (11)

| Slug | Description |
|---|---|
| `users` | Admin users (3 roles) |
| `media` | Uploaded files (5 image sizes, tags, usage tracking) |
| `pages` | Block-based CMS pages (SEO, templates, draft preview) |
| `posts` | Blog posts (categories, tags, related, reading time) |
| `products` | Products (HEX-V2, HEX-NET, accessories) |
| `faqs` | FAQ entries (draft/published status) |
| `dealers` | Authorized dealers (Fachhaendler) |
| `downloads` | Downloadable files |
| `team-members` | Team profiles |
| `testimonials` | Customer testimonials (Kundenstimmen) |
| `contact-submissions` | Contact form submissions stored in CMS |

### Globals (4)

| Slug | Description |
|---|---|
| `site-settings` | Company data, social links, analytics config, global SEO |
| `navigation` | Main and footer navigation structure |
| `theme-settings` | CMS-editable colors, fonts, button radius, section spacing |
| `style-settings` | Additional style configuration |

### Block Types (14 total, 10 active)

Active: `richText`, `image`, `youtube`, `cta`, `callout`, `pullquote`, `divider`, `faqBlock`, `stats`, `productGrid`

Deprecated (retained for existing content): `testimonialBlock`, `teamBlock`, `stepGuide`, `screenshot`

### Public Routes (19)

`/` `/ueber-vcds` `/produkte` `/kaufberatung` `/faq` `/download` `/kontakt` `/quickstart` `/blog` `/blog/[slug]` `/fachhaendler` `/upgrade` `/fernwartung` `/ahk-codieren` `/usermap` `/troubleshooting` `/impressum` `/datenschutz` `/styleguide` (noindex)

## Contributing

See `CLAUDE.md` for the full contributor guide: conventions, architecture decisions, design system, environment setup, and git workflow.

## Betreiber

Auto-Intern GmbH · Herner Str. 299, Geb. 29B · 44809 Bochum
VCDS Software: Ross-Tech, LLC
