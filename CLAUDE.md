# CLAUDE.md — Projekthandbuch VCDS.de

## Projekt

**VCDS.de** ist die offizielle Webseite fuer VCDS (VAG-COM Diagnostic System) von Ross-Tech, vertrieben durch Auto-Intern GmbH (Bochum). Die Seite ist ein Next.js 15 + Payload CMS Monorepo.

**Sprache:** Deutsch (de-DE). Alle UI-Texte, Labels, Fehlermeldungen und CMS-Beschreibungen sind auf Deutsch.

**Siehe auch:** `vcds-info.md` (Produkt/Firma), `context.md` (technischer Kontext), `briefing.md` (Kundenbriefing).

## Tech Stack

| Schicht | Technologie |
|---------|-------------|
| Framework | Next.js 15.4 (App Router, Server Components) |
| CMS | Payload CMS 3.x (eingebettet, nicht headless) |
| Datenbank | SQLite lokal, Turso/LibSQL in Produktion |
| Styling | Tailwind CSS 3 + CVA + CSS Variables (CMS-editierbar) |
| Design System | ThemeProvider + color-utils (Farbpaletten-Generator) |
| UI Primitives | Radix UI (Accordion, Tabs, Slot) |
| Icons | Lucide React + eigene Icon-Komponente |
| E-Mail | Resend SDK (Kontaktformular) |
| Tests | Vitest + Testing Library + jsdom (99 Tests) |
| Deployment | Docker Compose (Self-Hosted) |

## Befehle

```bash
npm run dev          # Entwicklungsserver (localhost:3000)
npm run build        # Produktions-Build
npm run seed         # Datenbank mit Startdaten befuellen
npm run test         # Vitest ausfuehren (99 Tests)
npm run test:watch   # Vitest im Watch-Modus
npm run generate:types  # Payload TypeScript-Types generieren
npx tsc --noEmit     # Type-Check (bekannter Fehler in seo.test.ts ignorieren)
```

## Projektstruktur

```
src/
  app/
    (app)/              # Oeffentliche Seiten (mit Layout)
      layout.tsx        # Layout (ThemeProvider, 4 Fonts, Analytics, LiveChat)
      page.tsx          # Startseite
      blog/             # Blog-Uebersicht + [slug] Detail
      produkte/         # Produktseite
      kaufberatung/     # Kaufberatung
      faq/              # FAQ (46 Fragen)
      download/         # Downloads
      kontakt/          # Kontaktformular
      quickstart/       # Interaktiver Setup-Guide (13 Schritte)
      fachhaendler/     # Haendler-Verzeichnis (9 DACH)
      upgrade/          # Interface-Upgrades
      fernwartung/      # AnyDesk Remote-Support
      ahk-codieren/     # AHK-Codierungs-Guides
      usermap/          # VCDS User Map
      troubleshooting/  # Fehlerbehebung
      ueber-vcds/       # Ueber VCDS
      impressum/        # Impressum
      datenschutz/      # Datenschutz
      styleguide/       # Design-Styleguide (noindex)
    (payload)/          # Payload Admin-Panel (/admin)
    api/
      contact/          # Kontaktformular (Resend + CMS-Speicherung)
      draft/            # Draft Preview (aktiviert draftMode)
      exit-draft/       # Draft Mode deaktivieren
      health/           # Health Check
      update/           # CMS Revalidation Webhook
      [...slug]/        # Payload REST API
    sitemap.ts          # Dynamische Sitemap
    robots.ts           # robots.txt
  collections/          # Payload CMS Collections (11)
    Pages.ts            # Seiten (Block-basiert, SEO, Templates)
    Posts.ts            # Blog-Beitraege (Kategorien, Tags, Related)
    Products.ts         # Produkte (HEX-V2, HEX-NET, Zubehoer)
    FAQs.ts             # FAQ-Eintraege (status: draft/published)
    Dealers.ts          # Fachhaendler
    Downloads.ts        # Download-Dateien
    Media.ts            # Medien (5 Groessen, Tags, Usage Tracking)
    Users.ts            # Admin-User (3 Rollen)
    TeamMembers.ts      # Team
    Testimonials.ts     # Kundenstimmen
    ContactSubmissions.ts # Kontaktformular-Eintraege
  globals/              # Payload Globals (3)
    SiteSettings.ts     # Firmendaten, Social, Analytics, SEO
    Navigation.ts       # Haupt- und Footer-Navigation
    ThemeSettings.ts    # CMS-editierbare Farben, Fonts, Layout
  hooks/
    revalidate.ts       # afterChange Hooks fuer Cache Invalidation
  blocks/               # Payload Block-Definitionen (14 Typen)
  components/
    ThemeProvider.tsx    # CSS Variable Injection (Server Component)
    AnimateOnScroll.tsx  # Scroll-triggered Reveals (Client Component)
    Header.tsx          # Server-Header
    HeaderClient.tsx    # Client-Header (Navigation, Dropdowns, Mobile)
    Footer.tsx          # Footer (Circuit Pattern, Primary-Icons)
    Icon.tsx            # Icon-Mapping (Lucide)
    Markdown.tsx        # Markdown-Renderer (XSS-safe)
    StructuredData.tsx  # JSON-LD Schemas
    admin/              # Custom Admin Components
      BulkUploadView.tsx    # Massenupload (/admin/bulk-upload)
      SEOPreview.tsx        # Google-SERP-Vorschau in SEO-Feldern
      MediaUsageField.tsx   # Bild-Verwendung anzeigen
    blocks/             # Block-Renderer (11 Komponenten)
    blog/               # Blog-Komponenten (ReadingProgress, ToC, ShareButtons, AuthorBio)
    ui/                 # UI-Primitives (Button, Card, PageHero, InfoBox, etc.)
  fields/               # Wiederverwendbare Payload-Felder
    slug.ts             # Auto-Slug (mit Umlaut-Behandlung)
    seo.ts              # SEO-Felder + Google-Vorschau
  lib/
    payload.ts          # CMS-Datenzugriff (getPages, getPosts, getThemeSettings, etc.)
    color-utils.ts      # Hex→HSL Farbpaletten-Generator (50-950)
    seo.ts              # SEO-Helper (getPageSeo, getGlobalSeo)
    serializeLexical.ts # Lexical richText → HTML
    markdown.ts         # Markdown → HTML (XSS-safe)
    blog-utils.ts       # Lesezeit-Berechnung
    utils.ts            # cn() Tailwind-Merge
  test/                 # Vitest Tests (8 Dateien, 99 Tests)
```

## Design System

### CSS Variables (CMS-editierbar)

Farben, Fonts und Layout werden in `ThemeSettings` Global gespeichert und als CSS Custom Properties injiziert:

```
--color-primary          # Primaerfarbe (Default: #2563eb)
--color-primary-50..950  # Auto-generierte Farbpalette
--color-accent           # Akzentfarbe (Default: #dc2626)
--color-accent-50..950   # Auto-generierte Farbpalette
--font-heading           # Ueberschriften-Font
--font-body              # Fliesstext-Font
--button-radius          # Button-Ecken
--section-y              # Vertikaler Section-Abstand
```

### Tailwind-Farben

- **`primary-*`**: Primaerfarbe (Links, Buttons secondary, Akzente)
- **`accent-*`**: Akzentfarbe (CTA-Buttons, Hervorhebungen)
- **`brand.blue`/`brand.red`**: Legacy-Aliases → mappen auf primary/accent
- **Semantische Farben** (InfoBox danger, Error States, Badge-Varianten) bleiben als `red-*`, `blue-*` etc.

### Fonts

4 Google Fonts geladen (Quicksand, Inter, DM Sans, Source Sans 3), aktiv per CSS Variable:
- `font-sans` → Body-Font
- `font-heading` → Heading-Font
- Standard: Quicksand fuer beides (VCDS Corporate Font)

### Animationen

- `.animate-on-scroll` + `.is-visible` → Scroll-triggered Fade-In
- `.stagger-children` → Gestaffelte Kind-Animationen
- `.blog-card` → Card-Reveal beim Laden
- `.circuit-pattern` → Langsame Drift-Animation (60s)
- `.grain` / `.grain-subtle` → Noise-Overlay fuer Tiefe
- `.link-underline` → Precision-Underline auf Hover
- `.section-divider` → Gradient-Trennlinie

## Architektur-Entscheidungen

### Server vs. Client Components
- **Standard: Server Components.** Alle Seiten sind Server Components.
- **Client Components** nur wo noetig: Header, Accordion, Tabs, Kontaktformular, LiveChat, AnimateOnScroll, BulkUpload.
- **Pattern bei Client-Daten:** Shared Data in separater `data.ts` (ohne `'use client'`).

### SEO
- Alle Seiten nutzen `generateMetadata()` mit `getPageSeo(slug, fallback)`.
- SEO-Felder im CMS mit Google-Vorschau + Zeichenzaehler.
- Structured Data: Organization, Product, FAQ, Breadcrumb, Article.
- Dynamische Sitemap holt Posts und Seiten aus CMS.

### Data Fetching
- CMS-Daten via `@/lib/payload.ts` (Server-only, `getPayload()`).
- Alle CMS-Aufrufe in try/catch mit Fallbacks.
- Draft-Modus: `getPostBySlug(slug, draft)` und `getPageBySlug(slug, draft)`.

### Cache Invalidation
- `afterChange` Hooks in Collections und Globals rufen `revalidatePath()` auf.
- Posts → `/blog/[slug]` + `/blog`, Pages → `/[slug]`, Globals → `/` (Layout).

### Blocks
- 14 Block-Typen: RichText, Image, YouTube, CTA, Callout, Pullquote, Divider, FAQ, Stats, ProductGrid, Testimonial, StepGuide, Screenshot.
- Gerendert via `BlockRenderer` Dispatcher.

## Environment Variables

```bash
# PFLICHT
PAYLOAD_SECRET=           # Min. 32 Zeichen (DB Encryption + JWT)
DATABASE_URI=file:./data/database.db  # Lokal: SQLite

# Site
SITE_URL=https://vcds.de
NEXT_PUBLIC_SITE_URL=https://vcds.de

# Optional
DRAFT_SECRET=             # Eigenes Secret fuer Draft Preview (Fallback: PAYLOAD_SECRET)
RESEND_API_KEY=           # Kontaktformular E-Mail
RESEND_DOMAIN=            # z.B. vcds.de
CONTACT_EMAIL_TO=         # z.B. support@vcds.de

# Produktion (Turso)
TURSO_AUTH_TOKEN=         # Turso DB Token
```

## Wichtige Konventionen

- **Tailwind-Klassen** mit `cn()` aus `@/lib/utils` mergen.
- **Icons** ueber `<Icon name="..." />` — keine direkten Lucide-Imports in Seiten.
- **Farben:** `primary-*` = Primaerfarbe, `accent-*` = Akzentfarbe. Keine hardcoded `blue-600` / `red-600` fuer Brand-Farben.
- **Abstaende:** `px-5` horizontal, `py-section-y` vertikal, `max-w-6xl mx-auto` Container.
- **Fonts:** `font-sans` (Body), `font-heading` (Ueberschriften) — beide CMS-editierbar.
- **Buttons:** `rounded-btn` (CMS-editierbar), Loading-State via `loading` Prop.
- **Responsive:** Mobile-first. Breakpoints: `sm:`, `md:`, `lg:`.
- **A11y:** `aria-label`, `sr-only`, `focus-visible:ring-2`, Min. Touch-Target 44px.
- **Breadcrumbs:** Via `<PageHero breadcrumb="Start / Seitenname" />`.

## CMS Admin

Erreichbar unter `/admin`. Erster Besuch → Admin-User erstellen. Credentials in Bitwarden speichern.

- **Inhalt:** Seiten, Blog-Beitraege, Produkte, FAQs
- **Medien:** Medien (5 Groessen, Tags, Usage), Downloads
- **Personen:** Team, Fachhaendler, Testimonials
- **System:** Benutzer, Kontaktanfragen
- **Einstellungen:** Website-Einstellungen, Navigation, Design-Einstellungen
- **Custom Views:** Massenupload (/admin/bulk-upload)

## Deployment

- **Methode:** Docker Compose (`docker compose up -d`)
- **Container:** Node 20 Alpine, Standalone-Build
- **Datenbank:** SQLite (lokal im Container, keine externe DB)
- **Volumes:** `vcds-data` (DB), `vcds-media` (Uploads)
- **Reverse Proxy:** Caddy/Nginx/Traefik fuer HTTPS
- **Anleitung:** Siehe `DEPLOYMENT.md`

## Git

- **Main Branch:** `main`
- **Commits:** Conventional Commits (feat/fix/chore), Englisch
- **Vor Push:** `npx tsc --noEmit` + `npm run test` + `npm run build`
