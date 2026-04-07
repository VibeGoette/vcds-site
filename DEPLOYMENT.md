# VCDS.de — Self-Hosted Deployment Guide

Anleitung fuer das Deployment auf einem eigenen Server mit Docker Compose.

## Voraussetzungen

- Docker + Docker Compose (v2+)
- Min. 1 GB RAM, 2 GB Festplatte
- Domain (vcds.de) mit DNS auf den Server zeigend
- Reverse Proxy fuer HTTPS (Nginx, Traefik, Caddy oder Coolify)

## Schnellstart

```bash
# 1. Repository entpacken / klonen
cd vcds-site

# 2. Umgebungsvariablen konfigurieren
cp .env.example .env
nano .env   # Mindestens PAYLOAD_SECRET setzen!
```

**PAYLOAD_SECRET generieren:**
```bash
openssl rand -hex 32
```

Diesen Wert in `.env` bei `PAYLOAD_SECRET=` einfuegen.

```bash
# 3. Starten
docker compose up -d

# 4. Pruefen ob es laeuft
docker compose ps
curl http://localhost:3000/api/health
```

Die Seite laeuft auf **Port 3000**.

## Erster Start — Admin-User anlegen

1. Im Browser oeffnen: `https://vcds.de/admin` (oder `http://server-ip:3000/admin`)
2. Ersten Admin-User anlegen: E-Mail + Passwort eingeben
3. **Zugangsdaten in Bitwarden speichern!**
4. Optional: Weitere Benutzer anlegen (Marketing, Editor — siehe briefing.md)

## Seed-Daten importieren (empfohlen)

Befuellt die Datenbank mit Startdaten (Produkte, FAQs, Team, Haendler, etc.):

```bash
docker compose exec vcds-site npx tsx src/seed.ts
```

Das erstellt:
- 9 Fachhaendler (DACH)
- 6 Produkte (HEX-V2, HEX-NET, Adapter, etc.)
- 3 Team-Mitglieder
- 3 Testimonials
- 24 FAQs (5 Kategorien)
- 11 Downloads
- 8 Blog-Posts
- 13 Seiten
- Navigation + Site-Settings + Design-Einstellungen (Defaults)

## Reverse Proxy (HTTPS)

Der Container laeuft auf Port 3000 (HTTP). Fuer HTTPS braucht es einen Reverse Proxy davor.

### Caddy (einfachste Option — automatisches HTTPS)

```Caddyfile
vcds.de {
    reverse_proxy localhost:3000
}

www.vcds.de {
    redir https://vcds.de{uri}
}
```

```bash
# Caddy installieren und starten
sudo apt install caddy
sudo systemctl enable caddy
sudo systemctl start caddy
```

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name vcds.de www.vcds.de;

    ssl_certificate /etc/ssl/vcds.de/fullchain.pem;
    ssl_certificate_key /etc/ssl/vcds.de/privkey.pem;

    client_max_body_size 15M;  # Fuer Bild-Uploads

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

Falls Coolify auf dem Server laeuft:
1. Neues Projekt → Docker Compose
2. Repository-Dateien hochladen oder URL eintragen
3. Environment Variables setzen (siehe `.env.example`)
4. Deploy

## Daten-Persistenz

Zwei Docker Volumes (werden automatisch erstellt):

| Volume | Inhalt | Backup-relevant |
|--------|--------|-----------------|
| `vcds-data` | SQLite Datenbank | Ja — enthaelt alle CMS-Inhalte |
| `vcds-media` | Hochgeladene Bilder | Ja — enthaelt alle Medien |

## Backup

```bash
# Datenbank sichern
docker cp $(docker compose ps -q vcds-site):/app/data/database.db ./backup-$(date +%Y%m%d).db

# Medien sichern
docker cp $(docker compose ps -q vcds-site):/app/media ./backup-media-$(date +%Y%m%d)
```

**Empfehlung:** Cronjob fuer taegliches Backup einrichten:
```bash
# /etc/cron.d/vcds-backup
0 3 * * * root docker cp $(docker compose -f /pfad/zu/docker-compose.yml ps -q vcds-site):/app/data/database.db /backups/vcds-$(date +\%Y\%m\%d).db
```

## Update

```bash
# Neue Version einspielen
# (ZIP entpacken oder git pull)

# Neu bauen und starten
docker compose build
docker compose up -d
```

Datenbank und Medien bleiben erhalten (Docker Volumes).

## Monitoring

**Health-Check Endpoint:** `https://vcds.de/api/health`

Gibt JSON zurueck:
```json
{"status":"ok","timestamp":"2026-04-07T14:00:00.000Z","service":"vcds-site"}
```

Docker Healthcheck ist konfiguriert (alle 30 Sekunden). Status pruefen:
```bash
docker compose ps   # Sollte "healthy" zeigen
```

## Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|---|---|---|
| `PAYLOAD_SECRET` | **Ja** | Mindestens 32 Zeichen (`openssl rand -hex 32`) |
| `SITE_URL` | Empfohlen | Eure Domain (Default: `https://vcds.de`) |
| `NEXT_PUBLIC_SITE_URL` | Empfohlen | Gleich wie SITE_URL |
| `RESEND_API_KEY` | Optional | E-Mail-Versand fuer Kontaktformular (resend.com) |
| `RESEND_DOMAIN` | Optional | Domain fuer Absender-Adresse |
| `CONTACT_EMAIL_TO` | Optional | Empfaenger-Adresse (Default: support@vcds.de) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Cloudflare Turnstile Bot-Schutz |
| `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile Server-Secret |
| `DRAFT_SECRET` | Optional | Eigenes Secret fuer Vorschau-Funktion |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional | Umami Analytics Site-ID |
| `NEXT_PUBLIC_UMAMI_URL` | Optional | Umami Analytics Script-URL |

## Fehlerbehebung

**Container startet nicht:**
```bash
docker compose logs vcds-site
```

**Datenbank-Fehler:**
```bash
# Datenbank zuruecksetzen (ACHTUNG: loescht alle Daten!)
docker compose down
docker volume rm vcds-site_vcds-data
docker compose up -d
# Dann Seed-Daten neu importieren
```

**Bilder werden nicht angezeigt:**
- Pruefen ob der `vcds-media` Volume korrekt gemountet ist
- Reverse Proxy muss Anfragen an Port 3000 weiterleiten

**Admin-Panel nicht erreichbar:**
- Pruefen ob der Container laeuft: `docker compose ps`
- Health-Check: `curl http://localhost:3000/api/health`

## Tech Stack

- Next.js 15.4 (App Router)
- Payload CMS 3.x (eingebettetes CMS)
- SQLite (Datenbank, keine externe DB noetig)
- Tailwind CSS (Styling)
- TypeScript
