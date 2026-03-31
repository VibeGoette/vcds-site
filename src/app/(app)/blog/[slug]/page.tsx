import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ═══ VISUAL COMPONENTS (per-article inline SVGs & layouts) ═══

function ShieldWarning() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef2f2" /><stop offset="100%" stopColor="#fee2e2" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#dangerGrad)" />
      <path d="M200 30 L260 130 H140 Z" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinejoin="round" />
      <text x="200" y="105" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#dc2626">!</text>
      <text x="200" y="155" textAnchor="middle" fontSize="13" fontWeight="600" fill="#991b1b">Keine Cracks. Keine Clones. Nur Originale.</text>
      <text x="200" y="175" textAnchor="middle" fontSize="10" fill="#b91c1c">Gefaelschte Software kann Steuergeraete beschaedigen</text>
    </svg>
  )
}

function ComparisonVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" /><stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" rx="16" fill="url(#compGrad)" />
      <rect x="20" y="20" width="170" height="180" rx="12" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <rect x="210" y="20" width="170" height="180" rx="12" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="105" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">HEX-V2</text>
      <text x="105" y="70" textAnchor="middle" fontSize="10" fill="#3b82f6">ab 294 EUR</text>
      <rect x="40" y="82" width="130" height="4" rx="2" fill="#dbeafe" />
      <rect x="40" y="82" width="78" height="4" rx="2" fill="#3b82f6" />
      <text x="40" y="104" fontSize="9" fill="#64748b">USB Verbindung</text>
      <text x="40" y="118" fontSize="9" fill="#64748b">3 / 10 / Unlimited VIN</text>
      <text x="40" y="132" fontSize="9" fill="#64748b">Voller Funktionsumfang</text>
      <text x="40" y="146" fontSize="9" fill="#64748b">Kostenloser Support</text>
      <rect x="40" y="158" width="130" height="24" rx="6" fill="#eff6ff" />
      <text x="105" y="174" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">Ideal: Hobby + Garage</text>
      <text x="295" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">HEX-NET</text>
      <text x="295" y="70" textAnchor="middle" fontSize="10" fill="#3b82f6">ab 514 EUR</text>
      <rect x="230" y="82" width="130" height="4" rx="2" fill="#dbeafe" />
      <rect x="230" y="82" width="130" height="4" rx="2" fill="#2563eb" />
      <text x="230" y="104" fontSize="9" fill="#64748b">WLAN + USB</text>
      <text x="230" y="118" fontSize="9" fill="#64748b">10 / Unlimited VIN</text>
      <text x="230" y="132" fontSize="9" fill="#64748b">Kabellose Diagnose</text>
      <text x="230" y="146" fontSize="9" fill="#64748b">Messwerte bei Fahrt</text>
      <rect x="230" y="158" width="130" height="24" rx="6" fill="#eff6ff" />
      <text x="295" y="174" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">Ideal: Werkstatt + Profi</text>
      <text x="200" y="214" textAnchor="middle" fontSize="9" fill="#94a3b8">Gleiche Software. Gleicher Support. Unterschied: Verbindung + Lizenz.</text>
    </svg>
  )
}

function FINGauge() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0fdf4" /><stop offset="50%" stopColor="#fefce8" /><stop offset="100%" stopColor="#fef2f2" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" rx="16" fill="url(#finGrad)" />
      <text x="200" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">FIN-Verbrauch: Was kostet welche Funktion?</text>
      <rect x="20" y="45" width="175" height="120" rx="10" fill="white" stroke="#bbf7d0" strokeWidth="1.5" />
      <circle cx="48" cy="65" r="8" fill="#22c55e" />
      <text x="62" y="69" fontSize="10" fontWeight="600" fill="#166534">Keine FIN</text>
      <text x="35" y="88" fontSize="9" fill="#4b5563">Auto-Scan erstellen</text>
      <text x="35" y="103" fontSize="9" fill="#4b5563">Fehlerspeicher loeschen</text>
      <text x="35" y="118" fontSize="9" fill="#4b5563">Messwerte auslesen</text>
      <text x="35" y="140" fontSize="8" fill="#16a34a">Unbegrenzt viele Fahrzeuge</text>
      <rect x="205" y="45" width="175" height="120" rx="10" fill="white" stroke="#fed7aa" strokeWidth="1.5" />
      <circle cx="233" cy="65" r="8" fill="#f59e0b" />
      <text x="247" y="69" fontSize="10" fontWeight="600" fill="#92400e">FIN belegt</text>
      <text x="220" y="88" fontSize="9" fill="#4b5563">Codierung</text>
      <text x="220" y="103" fontSize="9" fill="#4b5563">Anpassungen</text>
      <text x="220" y="118" fontSize="9" fill="#4b5563">Grundeinstellungen</text>
      <text x="220" y="133" fontSize="9" fill="#4b5563">Gateway / Stellglied</text>
      <text x="220" y="150" fontSize="8" fill="#d97706">Je nach Lizenzmodell begrenzt</text>
    </svg>
  )
}

function DecisionTree() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto" aria-hidden="true">
      <rect width="400" height="240" rx="16" fill="#f8fafc" />
      <rect x="130" y="15" width="140" height="36" rx="8" fill="#1e40af" />
      <text x="200" y="38" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Welches Interface?</text>
      <line x1="170" y1="51" x2="100" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="230" y1="51" x2="300" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="30" y="85" width="140" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#1e40af">Hauptsaechlich Garage?</text>
      <rect x="230" y="85" width="140" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="300" y="105" textAnchor="middle" fontSize="10" fill="#1e40af">Werkstatt / Probefahrt?</text>
      <line x1="60" y1="115" x2="60" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="140" y1="115" x2="140" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="300" y1="115" x2="300" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="15" y="145" width="90" height="36" rx="6" fill="#dbeafe" />
      <text x="60" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">1-3 Autos</text>
      <text x="60" y="173" textAnchor="middle" fontSize="8" fill="#3b82f6">HEX-V2 3VIN</text>
      <rect x="115" y="145" width="90" height="36" rx="6" fill="#dbeafe" />
      <text x="160" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">4-10 Autos</text>
      <text x="160" y="173" textAnchor="middle" fontSize="8" fill="#3b82f6">HEX-V2 10VIN</text>
      <rect x="250" y="145" width="130" height="36" rx="6" fill="#2563eb" />
      <text x="315" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Professionell</text>
      <text x="315" y="173" textAnchor="middle" fontSize="8" fill="#93c5fd">HEX-NET Unlimited</text>
      <rect x="80" y="200" width="240" height="28" rx="6" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="200" y="218" textAnchor="middle" fontSize="9" fill="#64748b">Upgrade jederzeit moeglich: 3 VIN → 10 VIN → Unlimited</text>
    </svg>
  )
}

function StatsVisual() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto" aria-hidden="true">
      <rect width="400" height="160" rx="16" fill="#0f172a" />
      <text x="200" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">VCDS in Zahlen</text>
      <text x="80" y="75" textAnchor="middle" fontSize="28" fontWeight="700" fill="#60a5fa">32.445</text>
      <text x="80" y="95" textAnchor="middle" fontSize="9" fill="#64748b">Fehlercodes</text>
      <text x="200" y="75" textAnchor="middle" fontSize="28" fontWeight="700" fill="#60a5fa">15+</text>
      <text x="200" y="95" textAnchor="middle" fontSize="9" fill="#64748b">Jahre Erfahrung</text>
      <text x="320" y="75" textAnchor="middle" fontSize="28" fontWeight="700" fill="#60a5fa">1000+</text>
      <text x="320" y="95" textAnchor="middle" fontSize="9" fill="#64748b">Kunden</text>
      <rect x="30" y="115" width="340" height="4" rx="2" fill="#1e293b" />
      <rect x="30" y="115" width="280" height="4" rx="2" fill="#2563eb" />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill="#475569">Abdeckung: VW, Audi, Skoda, Seat, Bentley, Lamborghini, Bugatti</text>
    </svg>
  )
}

function ChangelogVisual() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-auto" aria-hidden="true">
      <rect width="400" height="160" rx="16" fill="#f0fdf4" />
      <rect x="20" y="20" width="80" height="28" rx="6" fill="#16a34a" />
      <text x="60" y="39" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">v25.3.1</text>
      <text x="120" y="39" fontSize="10" fill="#64748b">Datenstand: 22.04.2025</text>
      <line x1="40" y1="60" x2="40" y2="145" stroke="#86efac" strokeWidth="2" />
      <circle cx="40" cy="72" r="5" fill="#22c55e" />
      <text x="55" y="76" fontSize="10" fontWeight="600" fill="#166534">HEX-NET v3 Support</text>
      <circle cx="40" cy="97" r="5" fill="#22c55e" />
      <text x="55" y="101" fontSize="10" fontWeight="600" fill="#166534">Modelljahr 2025+ (R-Mode)</text>
      <circle cx="40" cy="122" r="5" fill="#22c55e" />
      <text x="55" y="126" fontSize="10" fontWeight="600" fill="#166534">Ueberarbeitete Druckfunktion</text>
      <circle cx="40" cy="145" r="4" fill="#86efac" />
      <text x="55" y="149" fontSize="9" fill="#4b5563">Verbesserte Label-Dateien + Bugfixes</text>
    </svg>
  )
}

function FakeDetection() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="fakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef2f2" /><stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#fakeGrad)" />
      <text x="200" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Original vs. Faelschung</text>
      <rect x="20" y="42" width="170" height="140" rx="10" fill="white" stroke="#bbf7d0" strokeWidth="2" />
      <rect x="210" y="42" width="170" height="140" rx="10" fill="white" stroke="#fca5a5" strokeWidth="2" />
      <circle cx="35" cy="60" r="6" fill="#22c55e" /><text x="47" y="64" fontSize="10" fontWeight="600" fill="#166534">Original</text>
      <text x="35" y="84" fontSize="9" fill="#4b5563">Software-Updates</text>
      <text x="35" y="99" fontSize="9" fill="#4b5563">Telefon-Support</text>
      <text x="35" y="114" fontSize="9" fill="#4b5563">Forum + Wiki Zugang</text>
      <text x="35" y="129" fontSize="9" fill="#4b5563">Korrekte Diagnosen</text>
      <text x="35" y="144" fontSize="9" fill="#4b5563">Garantie</text>
      <rect x="35" y="155" width="140" height="18" rx="4" fill="#dcfce7" />
      <text x="105" y="168" textAnchor="middle" fontSize="8" fontWeight="600" fill="#166534">auto-intern.de/shop</text>
      <circle cx="225" cy="60" r="6" fill="#ef4444" /><text x="237" y="64" fontSize="10" fontWeight="600" fill="#991b1b">Faelschung</text>
      <text x="225" y="84" fontSize="9" fill="#4b5563" textDecoration="line-through">Keine Updates</text>
      <text x="225" y="99" fontSize="9" fill="#4b5563" textDecoration="line-through">Kein Support</text>
      <text x="225" y="114" fontSize="9" fill="#4b5563" textDecoration="line-through">Kein Forum</text>
      <text x="225" y="129" fontSize="9" fill="#dc2626">Fehlerhafte Diagnosen</text>
      <text x="225" y="144" fontSize="9" fill="#dc2626">Steuergeraete-Schaden</text>
      <rect x="225" y="155" width="140" height="18" rx="4" fill="#fee2e2" />
      <text x="295" y="168" textAnchor="middle" fontSize="8" fontWeight="600" fill="#991b1b">Finger weg!</text>
    </svg>
  )
}

function AccessCodeVisual() {
  return (
    <svg viewBox="0 0 400 140" className="w-full h-auto" aria-hidden="true">
      <rect width="400" height="140" rx="16" fill="#eff6ff" />
      <rect x="30" y="25" width="100" height="90" rx="8" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="80" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">VCDS</text>
      <text x="80" y="68" textAnchor="middle" fontSize="8" fill="#64748b">erkennt automatisch</text>
      <text x="80" y="82" textAnchor="middle" fontSize="8" fill="#64748b">ob Code noetig</text>
      <rect x="55" y="92" width="50" height="14" rx="4" fill="#dbeafe" />
      <text x="80" y="102" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1e40af">Just-in-Time</text>
      <path d="M135 70 L165 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <defs><marker id="arrowBlue" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6"><path d="M0 0 L10 5 L0 10 Z" fill="#3b82f6" /></marker></defs>
      <rect x="170" y="25" width="100" height="90" rx="8" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="220" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Code</text>
      <text x="220" y="68" textAnchor="middle" fontSize="8" fill="#64748b">wird angezeigt</text>
      <text x="220" y="82" textAnchor="middle" fontSize="8" fill="#64748b">wenn benoetigt</text>
      <rect x="195" y="92" width="50" height="14" rx="4" fill="#dcfce7" />
      <text x="220" y="102" textAnchor="middle" fontSize="7" fontWeight="600" fill="#166534">Keine PDF</text>
      <rect x="290" y="30" width="90" height="80" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <line x1="310" y1="50" x2="360" y2="90" stroke="#ef4444" strokeWidth="2" />
      <line x1="360" y1="50" x2="310" y2="90" stroke="#ef4444" strokeWidth="2" />
      <text x="335" y="120" textAnchor="middle" fontSize="8" fill="#dc2626">PDF-Kauf unnoetig</text>
    </svg>
  )
}

// ═══ ARTICLE DATA WITH VISUAL COMPONENTS ═══

interface PostData {
  slug: string; title: string; category: string; categoryLabel: string
  date: string; excerpt: string; visual: React.ReactNode
  sections: { heading?: string; text: string; type?: 'text' | 'callout' | 'warning' | 'tip' | 'comparison' }[]
  related: string[]
}

var posts: Record<string, PostData> = {
  'warum-kein-vcds-crack': {
    slug: 'warum-kein-vcds-crack', title: 'VCDS Crack Download Deutsch',
    category: 'beratung', categoryLabel: 'Beratung', date: '27. Oktober 2025',
    excerpt: 'VCDS Cracks in Deutschland? Kann das legal sein? Nein. Ist es wenigstens risikoarm? Auch nicht.',
    visual: <ShieldWarning />,
    sections: [
      { text: 'Im Internet kursieren zahlreiche Angebote fuer sogenannte VCDS Cracks. Diese modifizierten Versionen versprechen den vollen Funktionsumfang der Originalsoftware — kostenlos. Was auf den ersten Blick verlockend klingt, birgt erhebliche Risiken.' },
      { heading: 'Risiko Schadsoftware', text: 'Gecrackte VCDS-Versionen koennen Schadsoftware enthalten, die Ihren Computer infiziert. Trojaner, Keylogger und Ransomware wurden bereits in vermeintlichen VCDS-Downloads gefunden.', type: 'warning' },
      { heading: 'Risiko Fahrzeugschaden', text: 'Fehlerhafte Software kann Steuergeraete beschaedigen. Eine falsche Codierung oder ein fehlerhafter Schreibvorgang kann teure Reparaturen nach sich ziehen.', type: 'warning' },
      { heading: 'Risiko Strafverfolgung', text: 'Die Nutzung von Raubkopien ist in Deutschland strafbar. Ross-Tech und die Auto-Intern GmbH gehen aktiv gegen die Verbreitung vor.', type: 'warning' },
      { text: 'Ein originales HEX-V2 Interface erhalten Sie bereits ab 294 EUR inklusive kostenlosem Support, Updates und Forum-Zugang. Bei der Auto-Intern GmbH sind Sie auf der sicheren Seite.', type: 'tip' },
    ],
    related: ['qual-der-wahl-vcds', 'vorsicht-vor-gefaelschten-vcds-interfaces'],
  },
  'qual-der-wahl-vcds': {
    slug: 'qual-der-wahl-vcds', title: 'HEX-V2 vs. HEX-NET — Die Qual der Wahl!',
    category: 'beratung', categoryLabel: 'Beratung', date: '22. Mai 2025',
    excerpt: 'Was finden Sie wichtiger? Kabelloses Arbeiten oder der Preis? Wir helfen bei der Entscheidung.',
    visual: <ComparisonVisual />,
    sections: [
      { text: 'Die Wahl zwischen HEX-V2 und HEX-NET ist eine der haeufigsten Fragen, die unser Support-Team erreicht. Beide Adapter bieten den identischen Funktionsumfang der VCDS-Software — der Unterschied liegt in der Hardware.' },
      { heading: 'HEX-V2: Der Allrounder', text: 'Der HEX-V2 ist die kostenguenstige Variante ab 294 EUR. Er wird per USB-Kabel verbunden und eignet sich hervorragend fuer Hobbyschrauber, die hauptsaechlich in der Garage arbeiten. Mit drei VIN-Slots perfekt fuer die Familienflotte.' },
      { heading: 'HEX-NET: Fuer Profis', text: 'Der HEX-NET bietet WLAN-Konnektivitaet. Kabellose Diagnose, Messwerte waehrend der Fahrt und eine saubere Werkstatt ohne Kabelgewirr. Ab 514 EUR das Must-Have fuer professionelle Kfz-Werkstaetten.' },
      { text: 'Wenn Sie vorwiegend stationaer arbeiten und ein festes Budget haben, greifen Sie zum HEX-V2. Wenn Sie professionell diagnostizieren oder Messwerte bei Probefahrten benoetigen, fuehrt kein Weg am HEX-NET vorbei.', type: 'tip' },
    ],
    related: ['welches-vcds-kaufen', 'fin-verbrauch-bei-vcds'],
  },
  'fin-verbrauch-bei-vcds': {
    slug: 'fin-verbrauch-bei-vcds', title: 'FIN-Verbrauch bei VCDS — Komplette Liste',
    category: 'beratung', categoryLabel: 'Beratung', date: '4. April 2025',
    excerpt: 'Welche Funktionen verbrauchen eine FIN und welche nicht? Die vollstaendige Uebersicht.',
    visual: <FINGauge />,
    sections: [
      { text: 'Die Fahrzeugidentifikationsnummer (FIN) ist ein zentrales Konzept bei VCDS. Je nach Lizenzmodell koennen Sie 3, 10 oder unbegrenzt viele FINs nutzen. Aber nicht jede Funktion verbraucht eine FIN.' },
      { heading: 'Ohne FIN-Verbrauch', text: 'Auto-Scan erstellen, Fehlerspeicher auslesen und loeschen, Messwerte anzeigen — diese Funktionen koennen Sie an beliebig vielen Fahrzeugen durchfuehren, unabhaengig von Ihrem Lizenzmodell.', type: 'callout' },
      { heading: 'Mit FIN-Verbrauch', text: 'Codierungen, Anpassungen, Grundeinstellungen, Gateway-Verbauliste aendern, Zugriffsberechtigungen eingeben und Stellglied-Diagnosen. Erst wenn Sie eine dieser Funktionen an einem neuen Fahrzeug ausfuehren, wird eine FIN belegt.' },
      { text: 'Die FIN wird im Interface gespeichert und laesst sich nicht loeschen. Aber Sie koennen Ihre Lizenz jederzeit kurzfristig erweitern — ein Upgrade von 3 auf 10 VIN oder auf Unlimited ist ohne Hardware-Tausch moeglich.', type: 'tip' },
    ],
    related: ['qual-der-wahl-vcds', 'welches-vcds-kaufen'],
  },
  'welches-vcds-kaufen': {
    slug: 'welches-vcds-kaufen', title: 'Welches VCDS Geraet ist das richtige fuer mich?',
    category: 'beratung', categoryLabel: 'Beratung', date: '5. Februar 2025',
    excerpt: 'Die Kaufentscheidung leicht gemacht: Einsatzzweck, Fahrzeuganzahl, Budget.',
    visual: <DecisionTree />,
    sections: [
      { text: 'Die Auswahl des richtigen VCDS-Interfaces haengt von drei Faktoren ab: Ihrem Einsatzzweck, der Anzahl der Fahrzeuge und Ihrem Budget.' },
      { heading: 'Fuer Privatanwender', text: 'Mit 1-3 Fahrzeugen empfehlen wir den HEX-V2 mit 3 VIN-Lizenz (ab 294 EUR). Fuer Hobbyschrauber, die auch Freunden helfen, ist die 10 VIN-Variante ideal (ab 374 EUR).' },
      { heading: 'Fuer Werkstaetten', text: 'Professionelle Dienstleister sollten zur Unlimited-Version greifen. HEX-V2 Unlimited ab 474 EUR, HEX-NET Unlimited ab 614 EUR.' },
      { heading: 'USB vs. WLAN', text: 'Die Frage ist primaer eine des Komforts. Regelmaessige Probefahrten mit Diagnose? HEX-NET. Alles andere? HEX-V2 reicht vollkommen.', type: 'comparison' },
      { text: 'Unser Support-Team beraet Sie gerne telefonisch unter +49 (0) 234 58 545 800. Fragen kostet nichts.', type: 'tip' },
    ],
    related: ['qual-der-wahl-vcds', 'fin-verbrauch-bei-vcds'],
  },
  'gute-wahl-vcds': {
    slug: 'gute-wahl-vcds', title: 'Eine gute Wahl fuer Diagnosearbeiten bei VW, Audi & Co.',
    category: 'beratung', categoryLabel: 'Beratung', date: '31. Januar 2025',
    excerpt: 'VCDS hat die Fahrzeugdiagnose-Landschaft nachhaltig veraendert.',
    visual: <StatsVisual />,
    sections: [
      { text: 'Seit ueber 15 Jahren ist VCDS von Ross-Tech das Werkzeug der Wahl fuer Fahrzeugdiagnose im Volkswagen-Konzern. Was als Nischenprodukt begann, ist heute in tausenden Werkstaetten weltweit im Einsatz.' },
      { heading: 'Mehr als OBD-II', text: 'VCDS kommuniziert nicht nur mit dem Motor, sondern mit allen Steuergeraeten im Fahrzeug. ABS, Airbags, Klimaanlage, Lenkung, Getriebe, Kombiinstrument — VCDS erreicht sie alle.', type: 'callout' },
      { text: 'Mit aktuell 32.445 Fehlercodes im Klartext und kostenloser Unterstuetzung durch die Auto-Intern GmbH ist VCDS die beste Investition fuer jeden, der ernsthaft an VW, Audi, Skoda oder Seat arbeitet.' },
    ],
    related: ['qual-der-wahl-vcds', 'welches-vcds-kaufen'],
  },
  'update-25-3-1': {
    slug: 'update-25-3-1', title: 'Update 25.3.1 — Datenstand: 22.04.2025',
    category: 'versionshistorie', categoryLabel: 'Versionshistorie', date: '23. April 2025',
    excerpt: 'HEX-NET v3 Support, Modelljahr 2025+ und ueberarbeitete Druckfunktion.',
    visual: <ChangelogVisual />,
    sections: [
      { text: 'Ross-Tech hat das Update 25.3.1 mit Datenstand vom 22. April 2025 veroeffentlicht. Die neue Version bringt mehrere wichtige Neuerungen.' },
      { heading: 'HEX-NET v3 Support', text: 'Die neue Hardware-Version des HEX-NET wird jetzt vollstaendig unterstuetzt. Schnellere WLAN-Verbindung und verbesserte Stabilitaet.', type: 'callout' },
      { heading: 'Modelljahr 2025+ (R-Mode)', text: 'Erweiterte Kompatibilitaet fuer die neuesten Fahrzeuge der VW-Gruppe. Neue Steuergeraete-Definitionen und Label-Dateien.' },
      { text: 'Laden Sie das Update kostenlos auf unserer Download-Seite herunter. Keine Neuinstallation noetig — einfach drueber installieren.', type: 'tip' },
    ],
    related: ['gute-wahl-vcds'],
  },
  'vorsicht-vor-gefaelschten-vcds-interfaces': {
    slug: 'vorsicht-vor-gefaelschten-vcds-interfaces', title: 'Vorsicht vor gefaelschten VCDS-Interfaces',
    category: 'beratung', categoryLabel: 'Beratung', date: '17. Januar 2025',
    excerpt: 'Clone-Produkte taeuschen mit niedrigeren Preisen, verursachen aber fehlerhafte Diagnosen.',
    visual: <FakeDetection />,
    sections: [
      { text: 'Der Markt ist ueberschwemmt mit gefaelschten VCDS-Interfaces, die oft zu vermeintlich guenstigen Preisen angeboten werden. Diese Plagiate koennen eindeutig identifiziert werden.' },
      { heading: 'Die Risiken', text: 'Keine Software-Updates, kein Support, potenzielle Schaeden an Steuergeraeten und die Moeglichkeit, dass Schadsoftware auf Ihrem Computer installiert wird.', type: 'warning' },
      { heading: 'So erkennen Sie Faelschungen', text: 'Der Text auf dem Aufkleber, die verwendeten Schrauben, die Qualitaet des Gehaeuses und die Art der Verpackung koennen Hinweise geben. Bei Unsicherheit senden Sie Fotos an info@vcds.de.' },
      { text: 'Kaufen Sie ausschliesslich bei autorisierten Fachhaendlern. Die Auto-Intern GmbH ist der offizielle Vertriebspartner von Ross-Tech in Deutschland.', type: 'tip' },
    ],
    related: ['warum-kein-vcds-crack', 'gute-wahl-vcds'],
  },
  'zugriffsberechtigungscodes-was-man-wissen-sollte': {
    slug: 'zugriffsberechtigungscodes-was-man-wissen-sollte', title: 'Zugriffsberechtigungscodes — PDF notwendig?',
    category: 'beratung', categoryLabel: 'Beratung', date: '21. Oktober 2024',
    excerpt: 'Nein. VCDS zeigt Zugriffsberechtigungscodes automatisch an, wenn sie benoetigt werden.',
    visual: <AccessCodeVisual />,
    sections: [
      { text: 'Zugriffsberechtigungscodes werden von VCDS automatisch angezeigt, wenn sie fuer eine bestimmte Codierungs- oder Anpassungsaenderung benoetigt werden. Sie muessen keine separate PDF-Datei kaufen.' },
      { heading: 'Just-in-Time Anzeige', text: 'VCDS zeigt den benoetigten Code genau dann an, wenn Sie ihn brauchen. Dies ist ein grosser Vorteil gegenueber anderen Diagnosesystemen, bei denen Sie Codes vorab nachschlagen muessen.', type: 'callout' },
      { text: 'Viele Missverstaendnisse entstehen durch Drittanbieter, die PDF-Dokumente mit Zugriffsberechtigungscodes verkaufen. Diese sind bei Nutzung von VCDS nicht notwendig. Sparen Sie sich das Geld.', type: 'tip' },
    ],
    related: ['fin-verbrauch-bei-vcds', 'welches-vcds-kaufen'],
  },
}

// ═══ SECTION RENDERER ═══
function Section({ s }: { s: { heading?: string; text: string; type?: string } }) {
  if (s.type === 'warning') return (
    <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex gap-3">
      <Icon name="warning" size={18} className="text-red-500 shrink-0 mt-0.5" />
      <div>{s.heading && <h3 className="font-bold text-red-900 mb-1">{s.heading}</h3>}<p className="text-sm text-red-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  if (s.type === 'callout') return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-3">
      <Icon name="shield" size={18} className="text-blue-500 shrink-0 mt-0.5" />
      <div>{s.heading && <h3 className="font-bold text-blue-900 mb-1">{s.heading}</h3>}<p className="text-sm text-blue-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  if (s.type === 'tip') return (
    <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex gap-3">
      <Icon name="check" size={18} className="text-green-500 shrink-0 mt-0.5" />
      <div><p className="text-sm text-green-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  if (s.type === 'comparison') return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-3">
      <Icon name="bolt" size={18} className="text-amber-500 shrink-0 mt-0.5" />
      <div>{s.heading && <h3 className="font-bold text-amber-900 mb-1">{s.heading}</h3>}<p className="text-sm text-amber-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  return (
    <div>{s.heading && <h3 className="text-lg font-bold text-slate-900 mb-2">{s.heading}</h3>}<p className="text-slate-600 leading-relaxed">{s.text}</p></div>
  )
}

// ═══ PAGE ═══
var allSlugs = Object.keys(posts)

export function generateStaticParams() { return allSlugs.map(function(s) { return { slug: s } }) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  var p = posts[params.slug]; if (!p) return { title: 'Nicht gefunden' }
  return { title: p.title, description: p.excerpt }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  var post = posts[params.slug]; if (!post) notFound()
  var rel = post.related.map(function(s) { return posts[s] }).filter(Boolean)
  var catColor = post.category === 'versionshistorie' ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-blue-500/20 text-blue-300 border-blue-400/30'

  return (
    <><Header /><main id="main">
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Start</Link><span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link><span>/</span>
            <span className="text-slate-300">{post.categoryLabel}</span>
          </div>
          <span className={'inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-md border mb-4 ' + catColor}>{post.categoryLabel}</span>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-slate-400 text-sm">{post.date}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-5 py-12">
        <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8 pb-8 border-b border-slate-200">{post.excerpt}</p>

        {/* Article-specific SVG visual */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">{post.visual}</div>

        {/* Content sections with individual styling */}
        <div className="space-y-6 mb-12">
          {post.sections.map(function(s, i) { return <Section key={i} s={s} /> })}
        </div>

        {/* Shop CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12 text-center">
          <h3 className="font-bold text-slate-900 mb-2">Interesse geweckt?</h3>
          <p className="text-sm text-slate-600 mb-4">Alle VCDS Diagnoseadapter erhaeltlich im Auto-Intern Shop.</p>
          <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors">
            Im Shop bestellen <Icon name="arrow" size={16} className="text-white" />
          </a>
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 pb-8 border-b border-slate-200 mb-8">
          <span className="text-sm font-medium text-slate-500">Teilen:</span>
          <div className="flex gap-2">
            {['Forum', 'E-Mail', 'Link kopieren'].map(function(s) {
              return <button key={s} className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">{s}</button>
            })}
          </div>
        </div>

        {/* Related */}
        {rel.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-5">Verwandte Beitraege</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {rel.map(function(rp) { return (
                <Link key={rp.slug} href={'/blog/' + rp.slug} className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug text-sm">{rp.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rp.excerpt}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-medium">
                    <span>Lesen</span><Icon name="arrow" size={12} className="text-blue-600" />
                  </div>
                </Link>
              )})}
            </div>
          </div>
        )}
      </article>
    </main><Footer /></>
  )
}
