# VCDS.de — Fullstack Monorepo

Website der Auto-Intern GmbH fuer Ross-Tech VCDS Diagnoseadapter.

## Tech Stack
- **Next.js 15** (App Router)
- **Payload CMS 3.x** (Headless, im selben Repo)
- **TypeScript** (strict)
- **Tailwind CSS + shadcn/ui**
- **SQLite** (dev) / **Turso** (prod)
- **Quicksand** Font (next/font, DSGVO-konform)

## CMS Collections (10)
Users, Media, Pages, Posts, Products, Dealers, FAQs, Downloads, TeamMembers, Testimonials

## CMS Globals (2)
SiteSettings, Navigation

## Seiten (15)
- `/` — Startseite (Hero, Produkte, Stats, Testimonials)
- `/ueber-vcds` — Funktionen, FIN, Faelschungswarnung
- `/produkte` — 6 Kategorien mit Icons
- `/faq` — Accordion, 5 Teile
- `/download` — Tabs (VCDS/Support/Tools)
- `/kontakt` — Formular + 3 Team-Cards
- `/quickstart` — 13-Step Wizard
- `/blog` — Index mit 8 Artikel-Cards
- `/blog/[slug]` — 8 Artikel mit individuellen SVG-Visuals
- `/kaufberatung` — Vergleichstabelle + Empfehlung
- `/fachhaendler` — 9 DACH-Haendler
- `/upgrade` — FIN-Upgrades
- `/fernwartung` — AnyDesk-Anleitung
- `/impressum` + `/datenschutz`

## Admin Panel
`/admin` — Payload CMS Admin (nach erstem Start: Admin-User anlegen)

## Entwicklung
```bash
cp .env.example .env.local
npm install
npm run dev
# Admin: http://localhost:3000/admin
# Frontend: http://localhost:3000
```

## Deploy (Vercel)
Automatisch bei Push auf `main`.
Fuer Produktion: DATABASE_URI auf Turso umstellen.

## Betreiber
Auto-Intern GmbH · Herner Str. 299, Geb. 29B · 44809 Bochum
VCDS Software von Ross-Tech, LLC
