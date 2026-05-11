# SFD-Registrierung mit VCDS – Schritt für Schritt zur Freischaltung

Die SFD-Funktion (Schutz der Fahrzeugdiagnose) sichert in neueren Modellen von VW, Audi, Škoda und SEAT zahlreiche Steuergeräte gegen unautorisierte Zugriffe ab. Wer mit VCDS auf diese Bereiche zugreifen möchte, kommt an einer einmaligen Freischaltung über Ross-Tech nicht vorbei. Diese Anleitung führt dich durch alle vier Voraussetzungen und das Online-Formular.

> **Status:** Public Beta seit Mai 2025
> **Hersteller:** Ross-Tech, LLC
> **Kompatibel:** HEX-V2, HEX-NET

---

## So läuft die Registrierung ab

Der gesamte Prozess gliedert sich in drei Etappen:

1. **Vorbereiten** – Prüfen, ob dein Interface auf eine natürliche Person registriert ist.
2. **Formular ausfüllen** – Persönliche Daten plus Interface-Seriennummer übermitteln.
3. **Bestätigung abwarten** – Innerhalb von ein bis drei Werktagen erhältst du eine E-Mail mit der erfolgreichen Freischaltung.

Wichtig ist, dass alle Daten konsistent sind – Adapter-Registrierung, Formularangaben und Ausweisdokument müssen übereinstimmen, sonst lehnt Ross-Tech die Anfrage ab.

---

## 1. Interface muss auf eine natürliche Person registriert sein

Ross-Tech ordnet jede SFD-Freischaltung einer konkreten Person zu. Eine Registrierung des HEX-V2 oder HEX-NET auf eine Firma, einen Betrieb oder eine GmbH ist für den SFD-Service **nicht** zulässig – auch wenn das Interface ansonsten betriebsbereit ist.

**Was tun, wenn dein Adapter auf eine Firma läuft?**
Eine Neu-Registrierung auf eine natürliche Person ist jederzeit möglich. Den Vorgang stößt du über das VCDS-Konfigurationsprogramm an. Bei Unklarheiten hilft der VCDS.de-Support.

## 2. VCDS Beta 26.5 oder höher installieren

Der SFD-Service ist aktuell ausschließlich über die Beta-Schiene erreichbar. Du brauchst dafür:

- **VCDS Beta Version 26.5** (Stand 07.05.2025) oder neuer
- Dein Interface muss im **Beta-Kanal** laufen
- Anschließend ein **Firmware-Update** des Interfaces durchführen – Mindestversion **CB 0.4713**

Den Download stellt Ross-Tech direkt bereit:
👉 [VCDS Beta 26.5 herunterladen](https://www.ross-tech.com/vcds/download/beta/26-5.php)

Die Umstellung auf den Beta-Kanal nimmst du im VCDS-Hauptmenü unter **Optionen** vor. Das Firmware-Update startet beim nächsten Verbindungstest automatisch.

## 3. Ross-Tech SFD-Service-Account erstellen

Da jede Freischaltung einer Person zugeordnet wird, ist ein eigener Account beim Hersteller erforderlich. Die Identität bestätigst du beim ersten Login mit einem gültigen Ausweisdokument – Personalausweis, Reisepass oder Führerschein.

**Achtung:** Die im Account hinterlegten Daten müssen mit deinem Ausweis übereinstimmen. Schreibweise des Namens, Geburtsdatum und Anschrift werden beim Onboarding geprüft.

📋 [Ross-Tech SFD-Nutzungsbedingungen ansehen](/sfd-nutzungsbedingungen/)

## 4. SFD-Passwort für die Zwei-Faktor-Authentifizierung

Ross-Tech erfüllt mit dem SFD-Service die regulatorischen Vorgaben zur Zwei-Faktor-Authentifizierung. Neben deiner Interface-Seriennummer (Faktor 1) vergibst du dafür ein persönliches Passwort (Faktor 2). Dieses gibst du **bei jedem Start einer VCDS-Sitzung** ein, sobald du eine SFD-geschützte Funktion aufrufst.

**Passwort ändern:**
Du kannst dein SFD-Passwort jederzeit anpassen unter:
`VCDS → Einstellungen → Konfiguration → Registrierung`

---

## Online-Formular: Was du bereithalten solltest

Bevor du die Registrierung absendest, lege folgende Daten bereit:

- Vollständige Adresse (Straße, PLZ, Ort)
- E-Mail-Adresse
- **Lange VCDS-Seriennummer** des Interfaces – zu finden in der VCDS-Software unter dem Menüpunkt **„Über"**
- Ausweisdokument als JPG, PNG oder PDF (max. 10 MB)

Drei Einverständniserklärungen sind verpflichtend: Registrierung auf eine persönliche Person, gelesene Ross-Tech-Nutzungsbedingungen sowie die Datenschutzerklärung. Da Ross-Tech seinen Sitz in den USA hat (881 Sumneytown Pike, Lansdale PA 19446), wird die Datenübermittlung in ein Drittland explizit bestätigt.

**Bearbeitungszeit:** 1 bis 3 Werktage. Die Bestätigung erhältst du per E-Mail.

---

## Hilfe bei der Registrierung

Wenn etwas hakt oder du dir bei einem Schritt unsicher bist, sind wir für dich da:

- 💬 **VCDS.de Forum** – [SFD-Bereich](https://forum.vcds.de/c/vcds/sfd/50)
- ✉️ **E-Mail-Support** – [support@vcds.de](mailto:support@vcds.de)

Feedback und Verbesserungsvorschläge zum SFD-Service nehmen wir ebenfalls gern entgegen – die Public Beta lebt vom Input der Community.
