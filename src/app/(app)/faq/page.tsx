import { Header } from '@/components/Header'
import { FAQSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { IconBox } from '@/components/ui/IconBox'
import { getFAQs } from '@/lib/payload'
import { lexicalToText } from '@/lib/serializeLexical'
import { FAQAccordion } from './FAQAccordion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Häufig gestellte Fragen zu VCDS, HEX-V2, HEX-NET, Kompatibilität, Installation, Fehlerbehebung und Bedienung.',
}

interface FaqCategory {
  title: string
  icon: string
  items: { q: string; a: string }[]
}

const fallbackCategories: FaqCategory[] = [
  {
    title: 'Allgemein',
    icon: 'shield',
    items: [
      { q: 'Für welche Fahrzeugmarken ist VCDS geeignet?', a: 'VCDS funktioniert mit Fahrzeugen des Volkswagen-Konzerns: VW, Audi, SEAT, Škoda, Bentley, Bugatti, Lamborghini und einige Porsche-Modelle.' },
      { q: 'Welche Folgekosten habe ich nach dem Kauf?', a: 'Grundsätzlich keine. Updates innerhalb der gleichen Hauptversion sind kostenlos. Spezielle Features oder zusätzliche Lizenzen können je nach Nutzung Kosten verursachen.' },
      { q: 'Kann ich VCDS auf meinem Mac nutzen?', a: 'VCDS ist eine reine Windows-Anwendung. Mac-Nutzer können Boot Camp oder Virtualisierungssoftware wie Parallels Desktop verwenden — allerdings ohne Support-Garantie.' },
      { q: 'Wird mein Fahrzeug von VCDS unterstützt?', a: 'Kontaktieren Sie den Support zur Überprüfung. Die meisten Fahrzeuge des Volkswagen-Konzerns ab Baujahr 1994 werden unterstützt — die Chancen sind sehr hoch. VCDS funktioniert mit den meisten weltweit verkauften VW/Audi-Modellen ab 1994 und einigen ab 1990, sowie mit neueren SEAT- und Skoda-Modellen. Wenn Ihr Fahrzeug einen 16-poligen OBD-II-Anschluss hat, sollte VCDS funktionieren.' },
      { q: 'Wie bekomme ich Hilfe bei Fragen oder Problemen?', a: 'Prüfen Sie die offizielle Support-Seite, die Online-Foren, oder kontaktieren Sie den Support der Auto-Intern GmbH direkt für erstklassige Unterstützung. Telefon: +49 (0) 234 58 545 800, E-Mail: support@vcds.de' },
      { q: 'Unterstützt VCDS auch Elektrofahrzeuge?', a: 'Ja, viele Elektrofahrzeuge innerhalb der Volkswagen-Gruppe werden unterstützt. Prüfen Sie die Kompatibilitätslisten für spezifische Modelle.' },
      { q: 'Wie ist VCDS beim Thema SFD aufgestellt?', a: 'SFD (Schutz von Fahrzeugdiagnosen) ist eine Technologie in neueren VW-Fahrzeugen, die den Zugriff auf bestimmte Steuergeräte einschränkt. VCDS hat Funktionen implementiert, um mit SFD-geschützten Fahrzeugen zu arbeiten. Zusätzliche Authentifizierungsschritte über Hersteller-Backends können erforderlich sein.' },
      { q: 'Wo kaufe ich ein originales VCDS Interface?', a: 'Ausschließlich bei autorisierten Fachhändlern. Die Auto-Intern GmbH in Bochum ist der offizielle deutsche Vertriebspartner von Ross-Tech. Shop: auto-intern.de/shop — Vorsicht vor gefälschten Adaptern im Internet.' },
      { q: 'Was ist der Unterschied zwischen Personal und Unlimited?', a: 'Kein funktionaler Unterschied. Die Personal-Version ist auf 10 Fahrzeuge (FIN) begrenzt, die Unlimited-Version hat keine Einschränkung. Die Personal-Version ist günstiger und für Gelegenheitsnutzer gedacht — 10 FINs sollten für den eigenen Fuhrpark und die nahe Familie langfristig reichen.' },
      { q: 'Kann die Personal-Version auf Unlimited upgraden?', a: 'Ja, ein VIN-Upgrade ist jederzeit möglich. Das Upgrade kostet allerdings mehr als die Preisdifferenz, da zwei separate Bestellungen verarbeitet werden müssen.' },
    ],
  },
  {
    title: 'Technik & Kompatibilität',
    icon: 'cog',
    items: [
      { q: 'Was ist der Unterschied zu einem OBD-II-Scan-Tool?', a: 'OBD-II ist ein universelles Protokoll, das hauptsächlich für Abgaswerte zuständig ist. VCDS nutzt das proprietäre VW-Protokoll und unterstützt zahlreiche Fahrzeugsysteme über den Motor hinaus: Schlösser, Radio, ABS, Airbags, Getriebe, Wegfahrsperre und vieles mehr.' },
      { q: 'Funktioniert VCDS mit gechipptem Fahrzeug?', a: 'Ja. Seriöse Chip-Hersteller beeinträchtigen die Diagnosefunktionen nicht. VCDS sollte funktionieren, solange auch Werkstatt-Tools mit dem Steuergerät kommunizieren können.' },
      { q: 'Welche Funktionen sind in der aktuellen Version enthalten?', a: 'Alle Funktionen finden Sie in der Feature-Übersicht. VCDS wird kontinuierlich aktualisiert, um die neuesten Fahrzeuge zu unterstützen und die Funktionalität der Werkstatt-Software zu replizieren.' },
      { q: 'Was sind die Mindestanforderungen?', a: 'Windows 7, 8.1, 10 oder 11; mindestens 2 GB RAM; 800×600 Bildschirmauflösung. Virtualisiertes Windows wird nicht unterstützt. Single-Core Atom-Prozessoren sind nicht empfohlen.' },
      { q: 'USB oder serielles Interface?', a: 'USB für moderne PCs — zukunftssicherer. Seriell nur für ältere Systeme. Manche USB-zu-Seriell-Adapter haben Probleme mit den Timing-Anforderungen des VAG-Protokolls.' },
      { q: 'Was wenn mein PC kein Internet hat?', a: 'Laden Sie die Installationsdatei per USB oder CD herunter und übertragen Sie sie auf Ihren PC. Für Updates muss dieser Vorgang wiederholt werden. Während des Betriebs ist kein Internet nötig.' },
      { q: 'Wird es Mac- oder Linux-Versionen geben?', a: 'Nein, native Versionen sind nicht geplant. VCDS-Mobile funktioniert jedoch als plattformübergreifende Alternative auf diesen Systemen.' },
      { q: 'Welche Windows-Versionen unterstützt VCDS?', a: 'Windows 7, 8, 8.1, 10 und 11 werden unterstützt. Ältere Versionen funktionieren möglicherweise, werden aber nicht getestet. Windows S-Mode wird nicht unterstützt — wechseln Sie zur Home- oder Pro-Edition.' },
      { q: 'Funktioniert VCDS auf Microsoft Surface Tablets?', a: 'Surface Tablets mit Intel/AMD-CPUs funktionieren problemlos. Windows RT (32-Bit ARM) funktioniert nicht. Windows 10/11 ARM (64-Bit) funktioniert.' },
      { q: 'Kann VCDS den Kilometerzähler zurücksetzen?', a: 'Nein. Einzige Ausnahme: Ein brandneues Kombiinstrument unter 100 km kann einmalig gesetzt werden. Die meisten Kombiinstrumente ab 1998+ sind diagnosefähig.' },
      { q: 'Kann VCDS Steuergeräte flashen?', a: 'Nein. Die Verschlüsselungsmethoden variieren bei VW/Audi-Fahrzeugen, und Lizenzfragen verhindern dies. Kontaktieren Sie Chip-Tuner für Lademodifikationen.' },
      { q: 'Was brauche ich noch, um VCDS voll zu nutzen?', a: 'Ein gutes Reparaturhandbuch mit nativen Scan-Tool-Prozeduren für Ihr Fahrzeug. Zugang zu Reparaturinformationen über: erwin.vw.com, erwin.audiusa.com, erwin.volkswagen.de, erwin.audi.com, erwin.seat.com, erwin.skoda-auto.cz.' },
      { q: 'Funktioniert VCDS bei Fahrzeugen mit direktem CAN-Zugang?', a: 'Ja, mit CAN-kompatiblen Interfaces (HEX-COM+CAN, HEX-USB+CAN). MK5-Plattform-Fahrzeuge können das günstigere Micro-CAN verwenden.' },
    ],
  },
  {
    title: 'Fehlerbehebung',
    icon: 'warning',
    items: [
      { q: 'VCDS kommuniziert gar nicht — was tun?', a: 'Prüfen Sie: Adapter-Verbindung, Fahrzeugzündung eingeschaltet, korrekter COM-Port, Port-Konfiguration, Palm HotSync/ActiveSync deaktiviert, Kompatibilität mit Nachrüst-Radio, fahrzeugspezifische Einstellungen, Batterie- statt Netzstrom, passenden Netzadapter, IRQ-Konflikte über MSINFO32.' },
      { q: 'VCDS kommuniziert, aber unzuverlässig.', a: 'Schließen Sie andere Programme. Deaktivieren Sie Antivirus, Taskplaner, Microsoft Active-Sync, Fast-Find, bestimmte Netzwerktreiber, Drucker-Software, Energieverwaltung, Logitech QuickCam. Prüfen Sie Systemtray-Icons. Versuchen Sie eine saubere Windows-Installation. Deaktivieren Sie COM-Port FIFO-Puffer. Testen Sie alternative Ports.' },
      { q: 'Warum piept das Dashboard beim Zugriff auf das ABS-Steuergerät?', a: 'Normales Verhalten. Mehrere Pieptöne zeigen an, dass das ABS im Diagnosemodus und nicht funktionsfähig ist. Die Pieptöne stoppen nach Verlassen des Moduls.' },
      { q: 'Gibt es Fehlercodes, die ignoriert werden können?', a: 'Ja. Code 00513 (Motordrehzahlsensor) bei Bosch-Steuergeräten vor 1995, wenn der Motor nicht läuft — verschwindet beim Starten. Code 00526/17087 (Bremslichtschalter) bei Automatikgetrieben kann ignoriert werden, wenn die Bremse beim Scannen betätigt wird.' },
      { q: 'Was ist der Werkstattcode?', a: 'Jeder VW/Audi-Händler hat einen einzigartigen Werkstattcode, der bei Änderungen gespeichert wird. VCDS akzeptiert einen WSC einmalig auf dem Optionsbildschirm. Die Verwendung von 00000 = Stealth-Modus, bestehende Codes bleiben erhalten.' },
      { q: 'Was sind DEBUG-Dateien?', a: 'Dateien, die den Datenaustausch zwischen Auto und PC aufzeichnen. Nützlich zur Fehlerbehebung bei Kommunikationsproblemen. Standard-Level ist 0; der Support kann höhere Level für die Diagnose anfordern.' },
      { q: 'Was ist das Nachrüst-Radio-Problem?', a: 'Bestimmte Nachrüst-Radios können die K-Leitungs-Kommunikation stören. Weitere Details finden Sie auf der dedizierten Seite zum Nachrüst-Radio-Problem im VCDS Wiki.' },
    ],
  },
  {
    title: 'Bedienung',
    icon: 'bolt',
    items: [
      { q: 'Ist der Produkt-Support im Preis enthalten?', a: 'Absolut. Posten Sie in den Foren, schreiben Sie eine E-Mail oder rufen Sie an. Unser Team hilft gerne — beachten Sie aber, dass nicht alles über jedes Fahrzeugmodell bekannt sein kann.' },
      { q: 'Wie registriere/aktiviere ich meine Software?', a: 'Aktuelle Interfaces haben eine eingebaute Aktivierung — VCDS aktiviert sich automatisch nach dem ersten Test an einem Fahrzeug.' },
      { q: 'Kann ich VCDS während der Fahrt nutzen?', a: 'Dringend abgeraten — Unfallgefahr. Zeichnen Sie Daten in eine CSV-Datei auf und analysieren Sie diese später. Falls nötig, mit zwei Personen: einer fährt, einer beobachtet (Beifahrer sollte hinten sitzen, um Airbag-Verletzungsrisiko zu vermeiden).' },
      { q: 'Wie aktualisiere ich meine VCDS-Software?', a: 'Laden Sie die neueste Version herunter und installieren Sie sie (VCDS vorher schließen). Aktuelle Interfaces aktivieren sich automatisch nach dem Test an einem Fahrzeug. Kostenlose Updates sind für ein Jahr ab Kauf verfügbar.' },
      { q: 'Wie drucke ich Bildschirme oder Daten in VCDS?', a: 'Mehrere Bildschirme haben [Drucken]-Buttons für den Windows-Drucker. Einige Bildschirme haben [Zum Log hinzufügen]-Buttons. Verwenden Sie HardCopy (Freeware) für vollständige Bildschirmfotos.' },
      { q: 'Was sind Label-Dateien?', a: 'Label-Dateien ordnen Fehlercodes und Messwerten verständliche Beschreibungen zu. Sie werden bei VCDS-Updates automatisch aktualisiert. Details finden Sie auf der Label-Dateien-Seite im Wiki.' },
      { q: 'Wie erhöhe ich die Sampling-Rate in VCDS?', a: 'Zeichnen Sie nur eine Gruppe gleichzeitig auf. Setzen Sie Blk Int auf 25 und Char Int auf 0 im Optionsbildschirm (kann die Zuverlässigkeit verringern). Passen Sie die KP2-Zeit auf kleinere Werte für KWP-2000-Steuergeräte an. Verwenden Sie den [Turbo]-Button für KWP-2000-Motormodule mit HEX-Interfaces.' },
      { q: 'Wie bekomme ich meinen Radio-Code aus dem SAFE-Modus?', a: 'VCDS kann das nicht. Den Code erhalten Sie vom Händler (sollte auf einer Karte beim Fahrzeugkauf beiliegen). Weder VCDS noch Werkstatt-Tools rufen Sicherheitscodes ab. Viele Modelle ab 2000 verlassen den SAFE-Modus automatisch, wenn sie im selben Fahrzeug installiert werden.' },
      { q: 'Wie bekomme ich einen SKC für Wegfahrsperre/Schlüssel-Anpassung?', a: 'Es ist keine Abrufmethode bekannt. Fahrzeuge vor 2002 hatten PIN-Aufkleber; ab 2002 wird das WIN2-System verwendet; nach April 2005 das GEKO-System, das eine Händler-Verbindung erfordert. VCDS interagiert nicht mit GEKO.' },
    ],
  },
  {
    title: 'HEX-NET',
    icon: 'wifi',
    items: [
      { q: 'Was ist das HEX-NET?', a: 'Ross-Techs neuestes Hardware-Interface. Verbindet sich mit dem Standard J1962-Diagnoseanschluss und ermöglicht die PC/Smartphone/Geräte-Kommunikation über WiFi oder USB. Enthält eingebaute Lizenzen für VCDS (klassisch) und VCDS-Mobile.' },
      { q: 'Was bedeuten die drei LEDs am HEX-NET?', a: 'LED 1 (Auto): Dauerhaft grün = normal; blinkt rot = K-Leitung blockiert; wechselt rot/grün bei Kommunikation. LED 2 (WiFi): Orange = Access-Point-Modus; blinkt rot = versucht Infrastruktur-Verbindung; dauerhaft grün = verbunden. LED 3 (CPU): Blinkt grün = normale Aktivität; dauerhaft rot = beschäftigt; keine Aktivität = abgestürzt. Alle drei rot gleichzeitig = Flash-Schreibvorgang; alle drei aus außer LED 3 blinkt alle 2 Sekunden = Schlafmodus.' },
      { q: 'Was macht der Button am HEX-NET?', a: 'Kurzer Druck schaltet WiFi zwischen Access-Point und Infrastruktur-Modus um. Längerer Druck (15 Sekunden + Bestätigungston) setzt das Geräte-Passwort zurück. Noch längerer Druck (45 Sekunden + Ton) führt einen Werksreset durch.' },
      { q: 'Wie konfiguriere ich das HEX-NET WiFi?', a: 'Access-Point-Modus (Standard): Verbinden Sie sich mit dem Netzwerk "HN1-234567", öffnen Sie http://192.168.0.1, Standard-Passwort: "password". Konfigurieren Sie Profile 2-7 über Netzwerkoptionen. HEX-NET unterstützt nur 2.4 GHz WiFi; Kanäle 12-13 werden nicht unterstützt. Alternativ die VCIConfig-Software per USB verwenden.' },
      { q: 'Wie nutze ich klassisches Windows-VCDS mit dem HEX-NET?', a: 'VCDS 14+ erforderlich. Per USB als Plug-and-Play, oder kabellos: Wählen Sie den NET-Port im Optionsbildschirm, wenn beide mit dem gleichen WiFi verbunden sind.' },
      { q: 'Kann das HEX-NET dauerhaft im Auto bleiben?', a: 'Ja, aber überprüfen Sie, dass der Schlafmodus korrekt funktioniert. Konfigurieren Sie den Schlafmodus basierend auf Zündung/Spannungsstatus. Empfohlene Aktivzeit nach Zündung-aus: 60 Sekunden oder weniger. Prüfen: Auto/WiFi-LEDs aus und CPU-LED blinkt grün alle 2 Sekunden = Schlafmodus.' },
      { q: 'Warum trennt mein Android-Gerät die Verbindung zum HEX-NET im AP-Modus?', a: 'Viele Android-Versionen trennen WiFi-Verbindungen zu Access Points ohne Internet. Prüfen Sie "Automatischer Netzwerkwechsel" in den erweiterten WiFi-Einstellungen und deaktivieren Sie diese Option.' },
    ],
  },
]

export default async function FAQ() {
  let categories = fallbackCategories

  try {
    const cmsFaqs = await getFAQs()
    if (cmsFaqs.length > 0) {
      // Group CMS FAQs into a single category
      categories = [{
        title: 'Häufig gestellte Fragen',
        icon: 'chat',
        items: cmsFaqs.map(f => ({
          q: f.question,
          a: lexicalToText(f.answer),
        })),
      }]
    }
  } catch {
    // CMS not available — use fallback
  }

  // Flatten all items for schema
  const allFaqs = categories.flatMap(c => c.items)

  return (
    <>
      <FAQSchema items={allFaqs} />
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / FAQ"
          title="FAQ — Häufig gestellte Fragen"
          description="Antworten zu VCDS, HEX-V2, HEX-NET, Kompatibilität, Installation und Fehlerbehebung."
        />

        <div className="max-w-3xl mx-auto px-5 py-12 space-y-8">
          {categories.map(cat => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-4">
                <IconBox icon={cat.icon} size="sm" />
                <h2 className="text-lg font-bold text-slate-900">{cat.title}</h2>
                <span className="text-xs text-slate-400 font-medium">{cat.items.length} Fragen</span>
              </div>
              <Card padding="tight" className="overflow-hidden">
                <FAQAccordion items={cat.items} />
              </Card>
            </section>
          ))}

          <Card variant="muted" className="mt-10 text-center bg-blue-50 border-blue-100 p-8">
            <IconBox icon="chat" shape="circle" size="lg" className="mx-auto mb-4 bg-blue-100" />
            <h2 className="text-lg font-bold text-slate-900 mb-2">Ihre Frage ist nicht dabei?</h2>
            <p className="text-sm text-slate-600 mb-5">Unser Support-Team der Auto-Intern GmbH hilft Ihnen gerne weiter.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" href="/kontakt">Kontakt aufnehmen</Button>
              <Button variant="outline" href="https://forum.vcds.de" external>Im Forum fragen</Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
