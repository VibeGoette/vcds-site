# Unit Tests — VCDS.de

## Setup

| Tool | Version | Konfiguration |
|------|---------|---------------|
| Vitest | latest | `vitest.config.ts` |
| Testing Library | DOM + React + jest-dom | jsdom Environment |
| Setup-Datei | `src/test/setup.ts` | Globale Matchers |

```bash
npm run test          # Einmalig ausfuehren
npm run test:watch    # Watch-Modus (Datei-Aenderungen)
npx vitest run --reporter=verbose  # Ausfuehrliche Ausgabe
```

## Konfiguration (vitest.config.ts)

```ts
{
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/test/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': './src',
      '@payload-config': './payload.config.ts',
    },
  },
}
```

**Testdateien liegen in `src/test/`** — nicht neben den Quelldateien.

---

## Bestehende Tests (41 Tests, 4 Dateien)

### 1. blog-utils.test.ts (6 Tests)
Testet `calculateReadingTime()` aus `@/lib/blog-utils`.

| Test | Was wird geprueft |
|------|-------------------|
| returns 1 for empty post | Leerer Post = 1 Min Lesezeit |
| calculates from changelog | Berechnung aus Markdown-Changelog |
| calculates from excerpt | Berechnung aus Kurzbeschreibung |
| prefers changelog over excerpt | Changelog hat Prioritaet |
| returns at least 1 minute | Minimum ist immer 1 Minute |
| handles null/undefined fields | Null-Safety |

### 2. markdown.test.ts (12 Tests)
Testet `renderMarkdown()` aus `@/lib/markdown`.

| Test | Was wird geprueft |
|------|-------------------|
| renders a paragraph | Einfacher Text → `<p>` |
| renders headings | H1-H4 mit IDs |
| renders unordered/ordered lists | Listen-Rendering |
| renders bold and italic | Inline-Formatierung |
| renders inline code / code blocks | Code-Darstellung |
| renders horizontal rules | `---` → `<hr>` |
| escapes HTML to prevent XSS | `<script>` wird escaped |
| blocks javascript: URLs in links | XSS-Praevention |
| blocks data: URLs in links | XSS-Praevention |
| allows https / mailto links | Sichere URLs erlaubt |

### 3. lexicalHtml.test.ts (10 Tests)
Testet `lexicalToHtml()` und `extractLexicalHeadings()` aus `@/lib/serializeLexical`.

| Test | Was wird geprueft |
|------|-------------------|
| returns empty string for null | Null-Safety |
| returns empty string for empty root | Leerer Root-Node |
| renders paragraph | Lexical Paragraph → HTML |
| escapes HTML in text | XSS-Schutz |
| renders heading with id | H2 bekommt slug-ID |
| generates unique IDs for duplicate headings | "Setup" + "Setup" → `setup` + `setup-1` |
| renders bold and italic text | Format-Flags |
| blocks javascript: URLs in links | XSS-Praevention |
| renders unordered list | Listblock → `<ul>` |
| handles unknown node types gracefully | Kein Crash bei unbekannten Nodes |

### 4. serializeLexical.test.ts (6 + Tests)
Testet `lexicalToText()` aus `@/lib/serializeLexical`.

| Test | Was wird geprueft |
|------|-------------------|
| returns empty string for null/undefined | Null-Safety |
| extracts text from a simple paragraph | Plaintext-Extraktion |
| handles multiple paragraphs | Mehrzeilig |
| handles nested text with links | Link-Text wird extrahiert |
| handles list items | Listen-Text |
| handles linebreaks | Zeilenumbrueche |

---

## Test-Strategie

### Was wird getestet

| Schicht | Getestet | Grund |
|---------|----------|-------|
| **Lib-Funktionen** (Pure Functions) | Ja | Kernlogik, einfach zu testen |
| **Serializer** (Lexical → HTML, Markdown → HTML) | Ja | Sicherheitskritisch (XSS) |
| **API-Routen** | Nein (TODO) | Rate Limiting, Validierung |
| **React-Komponenten** | Nein (TODO) | UI-Regression |
| **CMS-Integration** | Nein | Braucht DB, besser E2E |
| **E2E** | Nein (TODO) | Playwright fuer Critical Paths |

### Prioritaeten fuer neue Tests

**Hohe Prioritaet (Security + Kernlogik):**
1. `src/lib/seo.ts` — `getPageSeo()` mit verschiedenen CMS-Antworten (null, partial, complete)
2. `src/lib/serializeLexical.ts` — weitere Edge Cases (deeply nested, malformed JSON)
3. API-Route `/api/contact` — Validierung, Rate Limiting, Error Handling

**Mittlere Prioritaet (Datenlogik):**
4. `src/lib/payload.ts` — Mock-Tests fuer `getPageBySlug`, `getPosts`, `getProducts`
5. `src/lib/blog-utils.ts` — Lexical-Block-basierte Lesezeit-Berechnung
6. `src/app/sitemap.ts` — dynamische Sitemap-Generierung

**Niedrige Prioritaet (UI):**
7. Komponenten-Tests: `PageHero`, `InfoBox`, `Button`, `Accordion`
8. Block-Renderer: `BlockRenderer` Dispatch-Logik
9. Header/Footer: Navigation-Links, Mobile-Menu

### Test schreiben — Pattern

```ts
// src/test/seo.test.ts
import { describe, it, expect, vi } from 'vitest'

// Mock Payload
vi.mock('@/lib/payload', () => ({
  getPageBySlug: vi.fn(),
}))

import { getPageSeo } from '@/lib/seo'
import { getPageBySlug } from '@/lib/payload'

describe('getPageSeo', () => {
  it('returns fallback when CMS has no page', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(null)
    const result = await getPageSeo('test', { title: 'Fallback' })
    expect(result.title).toBe('Fallback')
  })

  it('prefers CMS metaTitle over fallback', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue({
      slug: 'test',
      seo: { metaTitle: 'CMS Title' },
    } as never)
    const result = await getPageSeo('test', { title: 'Fallback' })
    expect(result.title).toBe('CMS Title')
  })

  it('returns fallback on CMS error', async () => {
    vi.mocked(getPageBySlug).mockRejectedValue(new Error('DB down'))
    const result = await getPageSeo('test', { title: 'Fallback' })
    expect(result.title).toBe('Fallback')
  })
})
```

### Konventionen

- **Dateiname:** `src/test/<modul>.test.ts` (kein `.spec.ts`)
- **Describe:** nach Funktionsname (`describe('calculateReadingTime', ...)`)
- **It:** beschreibt Erwartung (`it('returns 1 for empty post', ...)`)
- **Assertions:** `expect(...).toBe(...)` fuer Primitives, `.toContain(...)` fuer HTML
- **Mocking:** `vi.mock()` fuer Module, `vi.fn()` fuer Funktionen
- **Kein DB/CMS:** Tests laufen ohne Datenbank — CMS-Aufrufe mocken

---

## CI-Integration

Aktuell laeuft `npm run test` nur lokal. Empfehlung fuer CI:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run test
```
