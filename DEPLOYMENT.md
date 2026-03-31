# VCDS.de — Deployment Guide

Anleitung fuer das Deployment auf einem eigenen Server mit Docker Compose.

## Voraussetzungen

- Docker + Docker Compose installiert
- Git Zugang zum Repository
- Domain (vcds.de) mit DNS auf den Server zeigend

## Schnellstart (3 Befehle)

```bash
git clone https://github.com/VibeGoette/vcds-site.git
cd vcds-site
cp .env.example .env
```

`.env` editieren — mindestens `PAYLOAD_SECRET` setzen:
```
PAYLOAD_SECRET=ein-langer-geheimer-schluessel-mit-mindestens-32-zeichen
SITE_URL=https://vcds.de
```

Dann starten:
```bash
docker compose up -d
```

Die Seite laeuft auf Port 3000. Admin-Panel: `http://server:3000/admin`

## Erster Start

1. `http://server:3000/admin` oeffnen
2. Ersten Admin-User anlegen (E-Mail + Passwort)
3. Optional: Seed-Daten importieren (siehe unten)

## Seed-Daten importieren

```bash
docker compose exec vcds-site npx tsx src/seed.ts
```

Das befuellt die Datenbank mit:
- 9 Fachhaendler (DACH)
- 6 Produkte (HEX-V2, HEX-NET, Adapter, etc.)
- 3 Team-Mitglieder
- 3 Testimonials
- 24 FAQs
- 11 Downloads
- 8 Blog-Posts
- 13 Seiten
- Navigation + Site-Settings

## Reverse Proxy (Nginx / Traefik / Coolify)

Der Container laeuft auf Port 3000. Fuer HTTPS braucht es einen Reverse Proxy davor.

### Nginx Beispiel

```nginx
server {
    listen 443 ssl http2;
    server_name vcds.de www.vcds.de;

    ssl_certificate /etc/ssl/vcds.de/fullchain.pem;
    ssl_certificate_key /etc/ssl/vcds.de/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Coolify

Falls Coolify auf dem Server laeuft: Neues Projekt → Docker Compose → Repository URL eintragen → Environment Variables setzen → Deploy.

## Daten-Persistenz

Zwei Docker Volumes:
- `vcds-data` — SQLite Datenbank
- `vcds-media` — Hochgeladene Medien (Bilder etc.)

## Backup

```bash
# Datenbank sichern
docker compose exec vcds-site cp /app/data/database.db /app/data/backup-$(date +%Y%m%d).db

# Oder vom Host aus
docker cp vcds-site-vcds-site-1:/app/data/database.db ./backup-$(date +%Y%m%d).db
```

## Update

```bash
git pull
docker compose build
docker compose up -d
```

## Monitoring

Health-Check Endpoint: `http://server:3000/api/health`

Gibt JSON zurueck:
```json
{"status":"ok","timestamp":"2026-03-31T14:00:00.000Z","service":"vcds-site"}
```

Docker Healthcheck ist konfiguriert (alle 30 Sekunden).

## Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|---|---|---|
| `PAYLOAD_SECRET` | Ja | Mindestens 32 Zeichen, geheimer Schluessel fuer Payload CMS |
| `DATABASE_URI` | Nein | Standard: `file:/app/data/database.db` |
| `SITE_URL` | Nein | Standard: `https://vcds.de` |
| `RESEND_API_KEY` | Nein | Fuer E-Mail-Versand via Resend |

## Tech Stack

- Next.js 15.4.11
- Payload CMS 3.x
- SQLite (via @payloadcms/db-sqlite)
- Tailwind CSS
- TypeScript
