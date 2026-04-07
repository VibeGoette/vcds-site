# VCDS.de — Briefing fuer Auto-Intern GmbH

## Was wurde gebaut?

Eine komplett neue Website fuer VCDS.de mit einem eingebauten Content-Management-System (CMS). Ihr koennt Texte, Bilder, Produkte, FAQs und mehr selbst bearbeiten — ohne Programmierkenntnisse.

## Zugang zum Admin-Bereich

1. Oeffne im Browser: **vcds-site.vercel.app/admin** (spaeter: vcds.de/admin)
2. Beim allerersten Besuch: E-Mail und Passwort eingeben → das wird euer Admin-Konto
3. **Wichtig**: Zugangsdaten in Bitwarden speichern!

### Benutzerrollen

| Rolle | Wer | Was darf man |
|-------|-----|-------------|
| **Admin** | Geschaeftsfuehrung, IT | Alles — auch Benutzer verwalten und Design aendern |
| **Marketing** | Marketing-Team | Blog-Posts, FAQs, SEO-Einstellungen |
| **Editor** | Content-Team | Seiten und Produkte bearbeiten |

Neue Benutzer anlegen: Admin-Bereich → System → Benutzer → Neu erstellen

---

## Was kann ich im CMS machen?

### Design aendern (nur Admin)

**Admin → Einstellungen → Design-Einstellungen**

- **Farben**: Primaerfarbe (Blau) und Akzentfarbe (Rot) aendern. Einfach den Farbcode eingeben (z.B. `#2563eb` fuer Blau — findet ihr auf Seiten wie htmlcolorcodes.com). Alle hellen und dunklen Abstufungen werden automatisch erzeugt.
- **Schriftarten**: 4 Optionen fuer Ueberschriften und Fliesstext (Inter, DM Sans, Source Sans 3, Quicksand)
- **Button-Ecken**: Von eckig bis rund (Pillenform)
- **Abstaende**: Kompakt, Standard oder Grosszuegig

Aenderungen sind **sofort sichtbar** auf der Website.

### Bilder hochladen

**Einzeln:** Admin → Medien → Erstellen → Datei waehlen

**Mehrere gleichzeitig:** Oeffne **vcds-site.vercel.app/admin/bulk-upload** (bzw. vcds.de/admin/bulk-upload)
- Bilder per Drag & Drop oder Dateiauswahl
- Alt-Texte werden automatisch aus dem Dateinamen erzeugt
- Max. 10 MB pro Bild
- Empfohlen: 1200x800px oder groesser, PNG/WebP/JPEG

**Bilder organisieren:**
- Anzeigename vergeben (zum leichteren Finden)
- Kategorien zuweisen: Produkt, Team, Blog, Screenshot, Icon
- "Verwendet in" zeigt wo das Bild eingesetzt wird

### Blog-Posts schreiben

**Admin → Inhalt → Blog-Beitraege → Erstellen**

1. Titel eingeben (die URL-Kurzform wird automatisch erzeugt, z.B. "VCDS Update 2026" wird zu `/blog/vcds-update-2026`)
2. Kategorie waehlen
3. Titelbild hochladen
4. Inhaltsblöcke hinzufuegen:
   - **Text**: Normaler Fliesstext
   - **Bild**: Einzelbild mit Unterschrift
   - **YouTube**: Video einbetten
   - **Call-to-Action**: Hervorgehobener Button-Bereich
   - **FAQ**: FAQ-Eintraege einbinden
   - und weitere...
5. SEO-Felder ausfuellen (siehe unten)
6. Status auf "Veroeffentlicht" setzen → Speichern

**Vorschau**: Der "Live Preview" Button zeigt wie der Beitrag auf der Website aussieht, **bevor** er veroeffentlicht wird.

### FAQ verwalten

**Admin → Inhalt → FAQ-Eintraege**

- Neue Frage erstellen: Frage, Antwort, Kategorie (Teil 1-5) waehlen
- Status auf "Veroeffentlicht" setzen
- Reihenfolge ueber "Sortierung" steuern (niedrigere Zahl = weiter oben)

### SEO-Felder nutzen

Jede Seite und jeder Blog-Post hat SEO-Felder:

- **Google-Suchtitel**: So erscheint die Seite in Google (max. 70 Zeichen)
- **Google-Beschreibung**: Text unter dem Titel in Google (max. 160 Zeichen)
- **Google-Vorschau**: Zeigt euch direkt wie es in Google aussehen wird — mit Ampel-System (gruen = gut, gelb = grenzwertig, rot = zu lang)

### Kontaktanfragen einsehen

**Admin → System → Kontaktanfragen**

Alle Anfragen ueber das Kontaktformular werden hier gespeichert. Zusaetzlich wird jede Anfrage per E-Mail an support@vcds.de geschickt.

### Navigation bearbeiten

**Admin → Einstellungen → Navigation**

- Hauptmenue und Footer-Links bearbeiten
- Links muessen mit `/` (intern) oder `https://` (extern) beginnen
- "In neuem Tab oeffnen" fuer externe Links aktivieren

### Produkte und Preise

**Admin → Inhalt → Produkte**

- Produktname, Beschreibung, Hauptbild bearbeiten
- **Preis (Anzeige)**: Der Preis der auf der Website steht (z.B. "ab 294 EUR")
- **Varianten**: Einzelne Lizenzmodelle mit eigenen Preisen (3 VIN, 10 VIN, Unlimited)
- Wichtig: Varianten-Preise separat pflegen!

### Fachhaendler

**Admin → Inhalt → Fachhaendler**

- Firmenname, Adresse, Kontakt, Logo
- Land (DE/AT/CH)
- Sortierung: Niedrigere Zahl = weiter oben in der Liste

### Team-Mitglieder verwalten

**Admin → Personen → Team-Mitglieder**

- Name, Rolle, Beschreibung, Foto
- Motto und Spezialgebiete
- Aktiv/Inaktiv schalten (inaktive werden nicht auf der Website angezeigt)

### Kundenstimmen (Testimonials)

**Admin → Personen → Kundenstimmen**

- Zitat, Name und Herkunft des Kunden
- Aktiv/Inaktiv schalten und Reihenfolge aendern

### Website-Einstellungen

**Admin → Einstellungen → Website-Einstellungen**

- Firmendaten (Adresse, Telefon, E-Mail)
- Support-Zeiten
- Social Media Links
- Analytics (Umami Site-ID)
- SEO Global (Standard Meta-Description, Google/Bing Verifizierung)

---

## Technische Infos fuer die IT

- **Framework**: Next.js 15 + Payload CMS 3 + Tailwind CSS
- **Hosting**: Vercel (automatisches Deployment bei Push auf main)
- **Datenbank**: Turso (LibSQL) in Produktion
- **E-Mail**: Resend SDK fuer Kontaktformular
- **Auth**: Payload-eigenes System (nicht SSO/SAML) — Credentials in Bitwarden speichern
- **Backups**: Turso hat eingebaute Backups — zusaetzlich regelmaessige DB-Exports empfohlen
- **Env Vars auf Vercel**: PAYLOAD_SECRET, DATABASE_URI, TURSO_AUTH_TOKEN, RESEND_API_KEY, DRAFT_SECRET
