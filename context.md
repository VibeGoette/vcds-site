# VCDS.de — Technical Context

Dieses Dokument gibt LLMs, Entwicklern und neuen Chat-Sessions den vollen technischen Kontext des Projekts.

## Ueberblick

VCDS.de ist die offizielle Website fuer VCDS (VAG-COM Diagnostic System), vertrieben durch Auto-Intern GmbH in Bochum. Die Seite ist ein Next.js 15.4 + Payload CMS 3.x Monorepo.

**Siehe auch:** `vcds-info.md` fuer Produkt- und Firmendetails, `CLAUDE.md` fuer Coding-Konventionen.

## Tech Stack

| Schicht | Technologie |
|---------|-------------|
| Framework | Next.js 15.4 (App Router, Server Components) |
| CMS | Payload CMS 3.x (eingebettet, nicht headless) |
| Datenbank | SQLite lokal / Turso (LibSQL) in Produktion |
| Styling | Tailwind CSS 3 + CVA + CSS Variables (CMS-editierbar) |
| Design System | ThemeProvider + color-utils (auto-generierte Farbpaletten) |
| UI | Radix UI (Accordion, Tabs), Lucide Icons |
| E-Mail | Resend SDK |
| Tests | Vitest + Testing Library (99 Tests) |
| Deployment | Vercel (auto-deploy auf main) |
| Auth | Payload built-in (Admin/Marketing/Editor Rollen) |

## Aktueller Stand (April 2026)

- **20 Routen** (Startseite, Blog, Produkte, FAQ, Download, Kontakt, Quickstart, etc.)
- **11 Collections** (Pages, Posts, Products, FAQs, Dealers, Downloads, Media, Users, TeamMembers, Testimonials, ContactSubmissions)
- **3 Globals** (SiteSettings, Navigation, ThemeSettings)
- **14 Block-Typen** (RichText, Image, YouTube, CTA, Callout, Pullquote, Divider, FAQ, Stats, ProductGrid, Testimonial, StepGuide, Screenshot)
- **~12.000 LoC** TypeScript/TSX
- **99 Tests** (Vitest)

## Design System

Das Design ist CMS-editierbar via **ThemeSettings** Global:

- **Farben**: Primary + Accent als Hex-Werte, automatische 50-950 Shade-Generierung (`src/lib/color-utils.ts`)
- **Fonts**: 4 Optionen (Inter, DM Sans, Source Sans 3, Quicksand), separat fuer Headings + Body
- **Layout**: Button-Radius (none bis full), Section-Spacing (kompakt/standard/grosszuegig)
- **Umsetzung**: `ThemeProvider` (Server Component) holt CMS-Werte und rendert CSS Custom Properties. Tailwind referenziert diese via `var(--color-primary)` etc.
- **Farb-Klassen**: `primary-*` und `accent-*` statt hardcoded `blue-*` / `red-*`. Legacy-Alias `brand.blue`/`brand.red` existiert fuer Abwaertskompatibilitaet.
- **Animationen**: Scroll-triggered reveals (AnimateOnScroll + IntersectionObserver), Card-Reveals, Circuit-Drift, Link-Underlines

## Media Pipeline

- **Upload**: Einzeln via Payload Admin + Bulk Upload unter `/admin/bulk-upload`
- **Verarbeitung**: Sharp generiert 5 Groessen automatisch (thumbnail 300x200, mobile 480x320, card 800x533, desktop 1200x800, hero 1920px)
- **Verwaltung**: Display-Name (Umbenennung), Tags (Kategorien), Alt-Text-Validierung
- **Usage Tracking**: Custom Field zeigt wo jedes Bild verwendet wird
- **Limit**: Max 10 MB pro Datei im Bulk Upload

## CMS Features

- **Draft Preview**: `/api/draft` aktiviert Next.js draftMode, zeigt unveröffentlichte Inhalte
- **SEO Preview**: Google-SERP-Mockup in den SEO-Feldern mit Zeichenzaehler
- **Cache Invalidation**: `afterChange` Hooks rufen `revalidatePath()` bei Publish auf
- **ContactSubmissions**: Kontaktformular-Anfragen werden im CMS gespeichert (neben E-Mail via Resend)
- **Blog Editor**: Block-basiert (kein richText Fallback mehr)
- **FAQ Status**: `status: draft/published` (konsistent mit Posts/Pages)
- **Nav Validation**: URL-Felder validieren Format (`/` oder `https://`)

## Auth und Rollen

Payload CMS hat ein eingebautes Auth-System. Beim ersten Besuch von `/admin` wird ein Admin-User erstellt.

| Rolle | Zugriff |
|-------|---------|
| Admin | Vollzugriff auf alles |
| Marketing | Posts, FAQs, SEO, Keywords |
| Editor | Seiten, Produkte |

Auto-Intern nutzt **Bitwarden** fuer Credential-Management — Payload-Zugangsdaten dort speichern.

## Deployment

- **Plattform**: Vercel (Team: "max goettes projects")
- **Trigger**: Auto-deploy bei Push auf `main`
- **Datenbank lokal**: SQLite (`file:./data/database.db`)
- **Datenbank prod**: Turso/LibSQL (`DATABASE_URI` + `TURSO_AUTH_TOKEN`)
- **Domain**: vcds-site.vercel.app (spaeter: vcds.de)

## Bekannte Limitierungen

1. **Rate Limiter auf Kontaktformular** ist In-Memory und funktioniert nicht auf Vercel (Serverless = stateless). Fuer Production: Turnstile/hCaptcha oder Upstash Redis einsetzen.
2. **Alle 4 Google Fonts werden geladen**, auch wenn nur 2 aktiv sind. Next.js erfordert statische Font-Deklaration — dynamisches Laden ist nicht trivial.
3. **Vorbestehender TypeScript-Fehler** in `src/test/seo.test.ts` Zeile 18 (null-Parameter). Betrifft keine Runtime.

## Wichtige Verzeichnisse

```
/                       # Projekt-Root
  payload.config.ts     # Zentrale CMS-Config
  tailwind.config.ts    # Tailwind mit CSS Variable References
  src/
    globals/            # ThemeSettings, SiteSettings, Navigation
    collections/        # 11 Payload Collections
    hooks/              # revalidate.ts (Cache Invalidation)
    components/
      ThemeProvider.tsx  # CSS Variable Injection (Server Component)
      AnimateOnScroll.tsx # Scroll-Reveals (Client Component)
      admin/            # BulkUploadView, SEOPreview, MediaUsageField
    lib/
      color-utils.ts    # Hex→HSL Farbpaletten-Generator
      payload.ts        # CMS Data Access Layer
    app/
      api/draft/        # Draft Preview API
      api/exit-draft/   # Exit Draft Mode
      api/contact/      # Kontaktformular (Resend + CMS)
```
