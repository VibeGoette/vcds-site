# Coding-Anforderungen — VCDS.de

Checkliste fuer Code-Reviews, PRs und neue Features. Jede Aenderung sollte gegen diese Kriterien geprueft werden.

---

## 1. Code Quality Checks

### TypeScript
- [ ] `npx tsc --noEmit` laeuft fehlerfrei
- [ ] Kein `any` — explizite Typen verwenden, ggf. `unknown` + Type Guard
- [ ] Keine `@ts-ignore` oder `@ts-expect-error` ohne Kommentar
- [ ] Payload-Types aktuell (`npm run generate:types` nach Schema-Aenderungen)

### Code Style
- [ ] Keine unbenutzten Imports oder Variablen
- [ ] Keine doppelten IDs im DOM (z.B. Headings mit gleichem Text)
- [ ] Keine Magic Numbers — Konstanten mit sprechenden Namen verwenden
- [ ] Funktionen < 50 Zeilen — bei Ueberschreitung aufteilen
- [ ] Kein Dead Code (auskommentierter Code, ungenutzte Funktionen)

### Error Handling
- [ ] Alle CMS-Aufrufe in try/catch mit sinnvollem Fallback
- [ ] API-Routen geben strukturierte Fehler zurueck (kein 500 ohne Message)
- [ ] Keine Fehler, die still geschluckt werden (leere catch-Bloecke)
- [ ] User-Eingaben werden validiert (Kontaktformular, URL-Parameter)

### Security
- [ ] Keine `dangerouslySetInnerHTML` ohne Sanitization
- [ ] XSS-Schutz: Markdown-Renderer blockt `javascript:` und `data:` URLs
- [ ] SQL/NoSQL Injection: Payload ORM statt rohe Queries
- [ ] Rate Limiting auf API-Routen (Kontaktformular)
- [ ] Keine Secrets in Client-Code (nur `NEXT_PUBLIC_*` im Browser)
- [ ] Keine sensiblen Daten in Git (`.env`, Credentials)

---

## 2. Readability Checks

### Benennung
- [ ] Komponenten: PascalCase (`PageHero`, `BlogPostClient`)
- [ ] Funktionen/Hooks: camelCase (`getPageSeo`, `calculateReadingTime`)
- [ ] Dateien: Komponenten PascalCase, Utilities camelCase, Collections PascalCase
- [ ] Props-Interfaces: `[Komponentenname]Props` (z.B. `PageHeroProps`)

### Struktur
- [ ] Ein Export pro Datei (Ausnahme: verwandte Utilities in einer Lib-Datei)
- [ ] Server Components als Default — `'use client'` nur wo noetig
- [ ] Shared Data in eigene Datei (nicht aus `'use client'` exportieren)
- [ ] Imports sortiert: React/Next → Externe → Interne → Types

### Kommentare
- [ ] Nur wo die Logik nicht selbsterklaerend ist
- [ ] Keine offensichtlichen Kommentare (`// increment counter` ueber `counter++`)
- [ ] CMS-Felder: `admin.description` in Payload statt Code-Kommentare
- [ ] TODO-Kommentare nur mit Ticket/Issue-Referenz

---

## 3. Accessibility Checks (A11y)

### Semantik
- [ ] Korrekte Heading-Hierarchie (h1 → h2 → h3, keine Spruenge)
- [ ] Nur ein `<h1>` pro Seite
- [ ] Navigation in `<nav>` mit `aria-label`
- [ ] Breadcrumbs als `<nav aria-label="Breadcrumb">` + `<ol>`
- [ ] Listen als `<ul>` / `<ol>`, nicht als `<div>`-Ketten
- [ ] Formulare: `<label htmlFor>` + `<input id>` verknuepft
- [ ] Pflichtfelder: `aria-required="true"`
- [ ] Fehlermeldungen: `role="alert"` oder `aria-describedby`

### Interaktion
- [ ] Alle interaktiven Elemente per Tastatur erreichbar
- [ ] `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`
- [ ] Touch-Target mindestens 44x44px (WCAG 2.5.8)
- [ ] Skip-Link vorhanden ("Zum Hauptinhalt springen")
- [ ] Externe Links: `target="_blank" rel="noopener noreferrer"` + `<span className="sr-only">(oeffnet neuen Tab)</span>`

### Bilder & Medien
- [ ] Jedes `<img>` hat ein sinnvolles `alt`-Attribut (nie leer bei informativen Bildern)
- [ ] Dekorative Bilder: `alt=""` oder `aria-hidden="true"`
- [ ] Dekorative SVGs/Icons: `aria-hidden="true"`
- [ ] Videos: Untertitel oder Transkript (wenn vorhanden)

### Kontrast
- [ ] Text auf weissem Hintergrund: mindestens `text-slate-500` (4.6:1 Ratio, WCAG AA)
- [ ] Kein `text-slate-400` auf Weiss (3.0:1 = Fail)
- [ ] Text auf dunklem Hintergrund: mindestens `text-slate-300`
- [ ] Buttons: ausreichend Kontrast im Default- und Hover-State

### Screen Reader
- [ ] `aria-label` auf Buttons ohne sichtbaren Text (Share, Close, etc.)
- [ ] `aria-current="page"` auf aktiven Navigations-Links
- [ ] `sr-only` fuer zusaetzlichen Kontext (z.B. externe Links)
- [ ] Live-Regionen: `role="status"` fuer Erfolgs-Meldungen

---

## 4. UI Checks

### Design-Konsistenz
- [ ] Farben aus dem Design-System (Blue-600, Slate-900, etc.)
- [ ] Abstaende konsistent: `px-5`, `py-12`, `gap-3`, `space-y-12`
- [ ] Container: `max-w-6xl mx-auto` (breit) oder `max-w-3xl mx-auto` (schmal)
- [ ] Karten: `bg-white border border-slate-200 rounded-xl`
- [ ] Buttons via `<Button>` Komponente (nicht eigene Styles)
- [ ] Icons via `<Icon name="..." />` oder `<IconBox>`

### Komponenten-Nutzung
- [ ] `<PageHero>` fuer Seiten-Header mit Breadcrumb
- [ ] `<InfoBox>` fuer Hinweise (info/warning/success/danger)
- [ ] `<Accordion>` (Radix) statt nativer `<details>`
- [ ] `<Markdown>` fuer User-Content (XSS-safe)
- [ ] Tailwind-Klassen mit `cn()` mergen (nie String-Concatenation)

### Animationen
- [ ] `transition-all` oder `transition-colors` fuer Hover-Effekte
- [ ] Keine Scale-Animationen auf Dropdowns (zu aufdringlich)
- [ ] `prefers-reduced-motion` beachten bei komplexen Animationen

---

## 5. Mobile-Friendly Checks

### Responsive Layout
- [ ] Mobile-first: Basis-Styles ohne Breakpoint, dann `sm:`, `md:`, `lg:`
- [ ] Grid-Layouts: `grid-cols-1` mobil → `sm:grid-cols-2` → `lg:grid-cols-3`
- [ ] Kein horizontales Scrollen auf 320px Breite
- [ ] Tabellen responsiv (horizontaler Scroll oder Card-Layout)

### Touch
- [ ] Buttons/Links mindestens 44x44px Touch-Target
- [ ] Genug Abstand zwischen klickbaren Elementen (min. 8px)
- [ ] Keine Hover-only Interaktionen (Touch hat kein Hover)
- [ ] Dropdown-Menues muessen auch per Touch bedienbar sein

### Performance
- [ ] Bilder mit `next/image` (automatische Optimierung, WebP, Lazy Loading)
- [ ] Grosse Third-Party Scripts: `strategy="lazyOnload"` (LiveChat, Analytics)
- [ ] Keine riesigen Client-Bundles — Client Components minimal halten
- [ ] `loading="lazy"` fuer Bilder below-the-fold

### Typografie
- [ ] Texte nicht zu klein: mindestens `text-sm` (14px) fuer Fliesstext
- [ ] Zeilenlaenge auf Mobil: max. ~45 Zeichen (natuerlich durch Container-Breite)
- [ ] Kein `text-xs` fuer wichtige Inhalte (nur fuer Labels/Meta)

---

## 6. Performance Checks

### Bundle Size
- [ ] `'use client'` nur wo noetig (jedes Client-Component = JS-Bundle)
- [ ] Keine grossen Libraries in Client Components importieren
- [ ] Dynamic Imports (`next/dynamic`) fuer schwere Komponenten below-the-fold

### Bilder
- [ ] `next/image` mit korrekten `width`/`height` (kein Layout Shift)
- [ ] `sizes` Attribut setzen fuer responsive Bilder
- [ ] Media Collection generiert 5 Groessen: thumbnail, mobile, card, desktop, hero

### Caching
- [ ] Statische Seiten werden bei Build pre-rendered
- [ ] CMS-Daten: Payload nutzt Next.js Cache (kein manuelles Caching noetig)

---

## 7. SEO Checks

- [ ] `generateMetadata()` mit `getPageSeo()` auf jeder Seite
- [ ] Sinnvoller `title` und `description` als Fallback
- [ ] Structured Data wo relevant (FAQ, Article, Breadcrumb, Product)
- [ ] Interne Links als `<Link>` (nicht `<a>`)
- [ ] Externe Links mit `rel="noopener noreferrer"`
- [ ] Bilder mit beschreibendem `alt`-Text
- [ ] Canonical URLs korrekt
- [ ] Seite in `sitemap.ts` eingetragen

---

## Vor jedem Push

```bash
npx tsc --noEmit     # Type-Check
npm run test         # 41+ Tests muessen passen
npm run build        # Build muss durchlaufen (Vercel-kompatibel)
```
