# CLAUDE.md — Projekthandbuch VCDS.de

## Projekt

**VCDS.de** ist die offizielle Webseite fuer VCDS (VAG-COM Diagnostic System) von Ross-Tech, vertrieben durch Auto-Intern GmbH (Bochum). Die Seite ist ein Next.js 15 + Payload CMS Monorepo mit SQLite-Datenbank.

**Sprache:** Deutsch (de-DE). Alle UI-Texte, Labels, Fehlermeldungen und CMS-Beschreibungen sind auf Deutsch.

## Tech Stack

| Schicht | Technologie |
|---------|-------------|
| Framework | Next.js 15.4 (App Router) |
| CMS | Payload CMS 3.x (eingebettet, nicht headless) |
| Datenbank | SQLite lokal, Turso/LibSQL in Produktion |
| Styling | Tailwind CSS 3 + `class-variance-authority` |
| UI Primitives | Radix UI (Accordion, Tabs, Slot) |
| Icons | Lucide React + eigene Icon-Komponente |
| E-Mail | Resend SDK (Kontaktformular) |
| Tests | Vitest + Testing Library + jsdom |
| Deployment | Vercel |

## Befehle

```bash
npm run dev          # Entwicklungsserver (localhost:3000)
npm run build        # Produktions-Build
npm run seed         # Datenbank mit Startdaten befuellen
npm run test         # Vitest ausfuehren (41 Tests)
npm run test:watch   # Vitest im Watch-Modus
npm run generate:types  # Payload TypeScript-Types generieren
npx tsc --noEmit     # Type-Check ohne Build
```

## Projektstruktur

```
src/
  app/
    (app)/              # Oeffentliche Seiten (mit Layout)
      layout.tsx        # Haupt-Layout (Fonts, Metadata, Analytics, LiveChat)
      page.tsx          # Startseite
      blog/             # Blog-Uebersicht + [slug] Detail
      produkte/         # Produktseite
      kaufberatung/     # Kaufberatung
      faq/              # FAQ (46 Fragen)
      download/         # Downloads
      kontakt/          # Kontaktformular
      quickstart/       # Interaktiver Setup-Guide
      fachhaendler/     # Haendler-Verzeichnis
      upgrade/          # Interface-Upgrades
      fernwartung/      # AnyDesk Remote-Support
      ahk-codieren/     # AHK-Codierungs-Guides
      usermap/          # VCDS User Map
      troubleshooting/  # Fehlerbehebung (Server/Client Split)
      ueber-vcds/       # Ueber VCDS
      impressum/        # Impressum
      datenschutz/      # Datenschutz
      styleguide/       # Design-Styleguide (noindex)
    (payload)/          # Payload Admin-Panel (/admin)
    api/                # API-Routen (Kontakt, Payload REST)
    sitemap.ts          # Dynamische Sitemap (CMS + Fallback)
  collections/          # Payload CMS Collections
    Pages.ts            # Seiten (Block-basiert, SEO, Templates)
    Posts.ts            # Blog-Beitraege (Kategorien, Tags, Related)
    Products.ts         # Produkte (HEX-V2, HEX-NET, Zubehoer)
    FAQs.ts             # FAQ-Eintraege
    Dealers.ts          # Fachhaendler
    Downloads.ts        # Download-Dateien
    Media.ts            # Medien (5 Bildgroessen)
    Users.ts            # Admin-User
    TeamMembers.ts      # Team
    Testimonials.ts     # Kundenstimmen
  blocks/               # Payload Block-Definitionen (RichText, Image, CTA, FAQ, etc.)
  components/
    Header.tsx          # Server-Header
    HeaderClient.tsx    # Client-Header (Navigation, Dropdowns, Mobile)
    Footer.tsx          # Footer
    Icon.tsx            # Icon-Mapping (Lucide)
    Markdown.tsx        # Markdown-Renderer (XSS-safe)
    StructuredData.tsx  # JSON-LD Schemas (Organization, Product, FAQ, Breadcrumb, Article)
    blocks/             # Block-Renderer (11 Komponenten)
    blog/               # Blog-Komponenten (ReadingProgress, ToC, ShareButtons, AuthorBio)
    ui/                 # UI-Primitives (Button, PageHero, InfoBox, IconBox, Accordion, Tabs)
  fields/               # Wiederverwendbare Payload-Felder (slug, seo)
  lib/
    payload.ts          # CMS-Datenzugriff (getPageBySlug, getPosts, getProducts, etc.)
    seo.ts              # SEO-Helper (getPageSeo, getGlobalSeo)
    serializeLexical.ts # Lexical richText → HTML
    markdown.ts         # Markdown → HTML (XSS-safe)
    blog-utils.ts       # Lesezeit-Berechnung
    utils.ts            # cn() Tailwind-Merge
  test/                 # Vitest Tests
```

## Architektur-Entscheidungen

### Server vs. Client Components
- **Standard: Server Components.** Alle Seiten sind Server Components.
- **Client Components** nur wo noetig: Header (Navigation/Dropdown), Accordion, Tabs, Kontaktformular, LiveChat.
- **Pattern bei Client-Daten:** Wenn eine Server-Seite Daten braucht, die auch ein Client-Component nutzt, die Daten in eine separate `data.ts` (ohne `'use client'`) auslagern. Beispiel: `troubleshooting/data.ts`.

### SEO
- Alle Seiten nutzen `generateMetadata()` mit `getPageSeo(slug, fallback)` aus `@/lib/seo`.
- CMS-SEO-Felder (metaTitle, metaDescription, ogImage, noIndex) haben Vorrang, Hardcoded-Werte sind Fallback.
- Structured Data via `<script type="application/ld+json">` in `StructuredData.tsx`.
- Dynamische Sitemap in `src/app/sitemap.ts` — holt Posts und Seiten aus CMS.

### Data Fetching
- CMS-Daten via `@/lib/payload.ts` (Server-only, nutzt `getPayload()`).
- Alle CMS-Aufrufe in try/catch mit Fallbacks — die Seite muss auch ohne DB funktionieren.
- Blog-Posts haben 8 hardcoded Fallback-Artikel in `BlogPostClient.tsx`.

### Blocks
- Seiten und Posts nutzen ein Block-basiertes Layout (Payload Blocks).
- 11 Block-Typen: RichText, Image, YouTube, CTA, Callout, Pullquote, Divider, FAQ, Stats, ProductGrid, StepGuide.
- Gerendert via `BlockRenderer` Dispatcher in `components/blocks/`.

## Environment Variables

```bash
# PFLICHT
PAYLOAD_SECRET=           # Min. 32 Zeichen
DATABASE_URI=file:./data/database.db  # Lokal: SQLite

# Site
SITE_URL=https://vcds.de
NEXT_PUBLIC_SITE_URL=https://vcds.de

# Optional
RESEND_API_KEY=           # Kontaktformular E-Mail
RESEND_DOMAIN=            # z.B. vcds.de
CONTACT_EMAIL_TO=         # z.B. support@vcds.de
```

## Wichtige Konventionen

- **Tailwind-Klassen** mit `cn()` aus `@/lib/utils` mergen.
- **Icons** ueber `<Icon name="..." />` — keine direkten Lucide-Imports in Seiten.
- **Farben:** Blue-600 = Primaerfarbe, Slate-900 = Text, Slate-50 = Hintergrund.
- **Abstaende:** `px-5` horizontal, `py-12` vertikal, `max-w-6xl mx-auto` Container.
- **Font:** Quicksand (Google Fonts, Variable `--font-quicksand`).
- **Responsive:** Mobile-first. Breakpoints: `sm:`, `md:`, `lg:`.
- **A11y:** `aria-label` auf interaktiven Elementen, `sr-only` fuer Screen-Reader, `focus-visible:ring-2`, Min. Touch-Target 44px.
- **Breadcrumbs:** Via `<PageHero breadcrumb="Start / Seitenname" />` — generiert automatisch BreadcrumbSchema.

## CMS Admin

Erreichbar unter `/admin`. Payload CMS mit folgenden Collections:
- **Inhalt:** Seiten, Blog-Beitraege, Produkte, FAQs
- **Assets:** Medien (5 auto-generierte Groessen), Downloads
- **Personen:** Team-Mitglieder, Fachhaendler, Testimonials
- **System:** Benutzer, Website-Einstellungen (Navigation, SEO, Analytics)

## Git

- **Main Branch:** `main` (Produktion auf Vercel)
- **Feature Branches:** `claude/<feature-name>-<id>`
- **Commits:** Deutsch oder Englisch, Conventional Commits (feat/fix/chore)
- **Vor Push:** `npx tsc --noEmit` + `npm run test`
