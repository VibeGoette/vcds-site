'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@/components/Icon'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/* ═══ READING PROGRESS — with glow effect ═══ */
function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const u = () => {
      const el = document.getElementById('article-body')
      if (!el) return
      const r = el.getBoundingClientRect()
      const t = el.scrollHeight - window.innerHeight
      setP(Math.min(100, Math.max(0, (-r.top / t) * 100)))
    }
    window.addEventListener('scroll', u, { passive: true })
    return () => window.removeEventListener('scroll', u)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div className={`h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-150 ${p > 2 ? 'progress-glow' : ''}`} style={{ width: `${p}%` }} />
    </div>
  )
}

/* ═══ SVG ILLUSTRATIONS — Rich, detailed, unique per article ═══ */

function VisualCrack() {
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="cG1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#991b1b"/><stop offset="50%" stopColor="#dc2626"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
        <linearGradient id="cG2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="white" stopOpacity="0.12"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="800" height="360" fill="url(#cG1)" rx="16"/>
      {/* Circuit lines */}
      <g stroke="white" strokeWidth="0.5" opacity="0.06"><path d="M0 60h200l20 20h160l20-20h400"/><path d="M0 120h100l30 30h240l30-30h400"/><path d="M0 240h300l20-20h160l20 20h300"/><path d="M0 300h150l40 40h220l40-40h350"/></g>
      {/* Central danger triangle — glowing */}
      <g filter="url(#glow)">
        <path d="M400 50 L540 280 H260 Z" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" opacity="0.9"/>
        <path d="M400 50 L540 280 H260 Z" fill="url(#cG2)"/>
      </g>
      <text x="400" y="220" textAnchor="middle" fontSize="72" fontWeight="900" fill="white" opacity="0.95">!</text>
      {/* Scattered X marks — danger symbols */}
      <g stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.25">
        <line x1="100" y1="80" x2="130" y2="110"/><line x1="130" y1="80" x2="100" y2="110"/>
        <line x1="670" y1="70" x2="700" y2="100"/><line x1="700" y1="70" x2="670" y2="100"/>
        <line x1="80" y1="220" x2="110" y2="250"/><line x1="110" y1="220" x2="80" y2="250"/>
        <line x1="690" y1="230" x2="720" y2="260"/><line x1="720" y1="230" x2="690" y2="260"/>
        <line x1="160" y1="290" x2="185" y2="315"/><line x1="185" y1="290" x2="160" y2="315"/>
        <line x1="620" y1="290" x2="645" y2="315"/><line x1="645" y1="290" x2="620" y2="315"/>
      </g>
      {/* Small dots — circuit nodes */}
      <g fill="white" opacity="0.15">
        <circle cx="200" cy="60" r="3"/><circle cx="380" cy="60" r="3"/><circle cx="420" cy="60" r="3"/><circle cx="600" cy="60" r="3"/>
        <circle cx="100" cy="120" r="3"/><circle cx="130" cy="150" r="3"/><circle cx="370" cy="150" r="3"/><circle cx="430" cy="150" r="3"/>
      </g>
      {/* Bottom text */}
      <rect x="240" y="300" width="320" height="36" rx="18" fill="white" fillOpacity="0.1"/>
      <text x="400" y="324" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" opacity="0.7" letterSpacing="0.05em">KEINE CRACKS · KEINE CLONES</text>
    </svg>
  )
}

function VisualComparison() {
  return (
    <svg viewBox="0 0 800 380" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="vG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1e3a5f"/><stop offset="50%" stopColor="#2563eb"/><stop offset="100%" stopColor="#0891b2"/></linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#vG)" rx="16"/>
      <g stroke="white" strokeWidth="0.5" opacity="0.05"><path d="M0 40h800"/><path d="M0 80h800"/><path d="M0 340h800"/></g>
      {/* V2 Card */}
      <rect x="40" y="30" width="340" height="310" rx="16" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
      <rect x="40" y="30" width="340" height="60" rx="16" fill="white" fillOpacity="0.05"/>
      <rect x="379" y="46" width="1" height="28"/>
      <text x="210" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="white" letterSpacing="-0.02em">HEX-V2</text>
      <text x="210" y="105" textAnchor="middle" fontSize="15" fill="white" opacity="0.5">Der Allrounder</text>
      <text x="210" y="140" textAnchor="middle" fontSize="36" fontWeight="800" fill="white" opacity="0.9">ab 294 €</text>
      {/* Feature bars */}
      <g opacity="0.7">
        <rect x="80" y="170" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="80" y="170" width="160" height="4" rx="2" fill="white" fillOpacity="0.7"/>
        <text x="80" y="196" fontSize="12" fill="white" opacity="0.6">Funktionsumfang</text>
        <rect x="80" y="210" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="80" y="210" width="260" height="4" rx="2" fill="white" fillOpacity="0.7"/>
        <text x="80" y="236" fontSize="12" fill="white" opacity="0.6">Software identisch</text>
        <rect x="80" y="250" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="80" y="250" width="0" height="4" rx="2" fill="white" fillOpacity="0.3"/>
        <text x="80" y="276" fontSize="12" fill="white" opacity="0.4">WLAN — nur mit HEX-NET</text>
      </g>
      <rect x="80" y="296" width="260" height="32" rx="8" fill="white" fillOpacity="0.15"/><text x="210" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" opacity="0.8">USB · 3/10/Unlimited VIN</text>
      {/* VS circle */}
      <circle cx="400" cy="190" r="30" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
      <text x="400" y="197" textAnchor="middle" fontSize="16" fontWeight="900" fill="white" opacity="0.8">VS</text>
      {/* NET Card */}
      <rect x="420" y="30" width="340" height="310" rx="16" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
      <rect x="420" y="30" width="340" height="60" rx="16" fill="white" fillOpacity="0.05"/>
      <text x="590" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="white" letterSpacing="-0.02em">HEX-NET</text>
      <text x="590" y="105" textAnchor="middle" fontSize="15" fill="white" opacity="0.5">Fuer Profis</text>
      <text x="590" y="140" textAnchor="middle" fontSize="36" fontWeight="800" fill="white" opacity="0.9">ab 514 €</text>
      <g opacity="0.7">
        <rect x="460" y="170" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="460" y="170" width="260" height="4" rx="2" fill="white" fillOpacity="0.7"/>
        <text x="460" y="196" fontSize="12" fill="white" opacity="0.6">Funktionsumfang</text>
        <rect x="460" y="210" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="460" y="210" width="260" height="4" rx="2" fill="white" fillOpacity="0.7"/>
        <text x="460" y="236" fontSize="12" fill="white" opacity="0.6">Software identisch</text>
        <rect x="460" y="250" width="260" height="4" rx="2" fill="white" fillOpacity="0.15"/><rect x="460" y="250" width="260" height="4" rx="2" fill="#22d3ee" fillOpacity="0.8"/>
        <text x="460" y="276" fontSize="12" fill="white" opacity="0.8" fontWeight="600">WLAN — kabellose Diagnose</text>
      </g>
      <rect x="460" y="296" width="260" height="32" rx="8" fill="#22d3ee" fillOpacity="0.2"/><text x="590" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" opacity="0.9">WLAN + USB · 10/Unlimited</text>
      {/* Footer */}
      <text x="400" y="368" textAnchor="middle" fontSize="11" fill="white" opacity="0.3" letterSpacing="0.1em">GLEICHE SOFTWARE · GLEICHER SUPPORT</text>
    </svg>
  )
}

function VisualFIN() {
  return (
    <svg viewBox="0 0 800 320" className="w-full h-auto" aria-hidden="true">
      <defs><linearGradient id="fG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#064e3b"/><stop offset="50%" stopColor="#059669"/><stop offset="100%" stopColor="#0d9488"/></linearGradient></defs>
      <rect width="800" height="320" fill="url(#fG)" rx="16"/>
      <g stroke="white" strokeWidth="0.5" opacity="0.05"><path d="M400 0v320"/><path d="M0 160h800"/></g>
      {/* Left: Free */}
      <rect x="40" y="30" width="350" height="260" rx="14" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1" strokeOpacity="0.1"/>
      <circle cx="80" cy="68" r="16" fill="#22c55e"/><path d="M73 68l4 4 8-8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <text x="108" y="74" fontSize="18" fontWeight="800" fill="white">Keine FIN noetig</text>
      <g fontSize="14" fill="white" opacity="0.75"><text x="65" y="115">Auto-Scan erstellen</text><text x="65" y="142">Fehlerspeicher lesen + loeschen</text><text x="65" y="169">Messwerte anzeigen</text><text x="65" y="196">Klartext-Fehlercodes</text></g>
      <rect x="65" y="220" width="300" height="40" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="215" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#86efac">Unbegrenzt viele Fahrzeuge</text>
      {/* Right: FIN needed */}
      <rect x="410" y="30" width="350" height="260" rx="14" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1" strokeOpacity="0.1"/>
      <circle cx="450" cy="68" r="16" fill="#f59e0b"/><text x="450" y="74" textAnchor="middle" fontSize="14" fontWeight="800" fill="white">!</text>
      <text x="478" y="74" fontSize="18" fontWeight="800" fill="white">FIN wird belegt</text>
      <g fontSize="14" fill="white" opacity="0.75"><text x="435" y="115">Codierung + Anpassungen</text><text x="435" y="142">Grundeinstellungen</text><text x="435" y="169">Gateway-Verbauliste</text><text x="435" y="196">Stellglied-Diagnosen</text></g>
      <rect x="435" y="220" width="300" height="40" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="585" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fde68a">Je nach Lizenz begrenzt</text>
      <text x="400" y="310" textAnchor="middle" fontSize="11" fill="white" opacity="0.35" letterSpacing="0.1em">UPGRADE JEDERZEIT MOEGLICH</text>
    </svg>
  )
}

function VisualGeneric({ gradient, icon, label }: { gradient: string; icon: string; label: string }) {
  return (
    <svg viewBox="0 0 800 280" className="w-full h-auto" aria-hidden="true">
      <defs><linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={gradient.split(',')[0]}/><stop offset="100%" stopColor={gradient.split(',')[1]}/></linearGradient></defs>
      <rect width="800" height="280" fill={`url(#gG)`} rx="16"/>
      <g stroke="white" strokeWidth="0.5" opacity="0.05"><path d="M0 40h800"/><path d="M0 240h800"/><path d="M400 0v280"/></g>
      <g opacity="0.06" transform="translate(400,140)"><Icon name={icon} size={200} className="text-white"/></g>
      <rect x="300" y="200" width="200" height="40" rx="20" fill="white" fillOpacity="0.1"/>
      <text x="400" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" opacity="0.6" letterSpacing="0.05em">{label}</text>
    </svg>
  )
}

/* ═══ POST DATA ═══ */
interface Sec { heading?: string; text: string; type?: 'text'|'callout'|'warning'|'tip'|'pullquote' }
interface Post { slug:string; title:string; subtitle:string; cat:string; catLabel:string; date:string; reading:string; gradient:string; gradientCSS:string; icon:string; visual:React.ReactNode; sections:Sec[]; related:string[] }

const P: Record<string,Post> = {
  'warum-kein-vcds-crack': {
    slug:'warum-kein-vcds-crack', title:'VCDS Crack Download Deutsch', subtitle:'Warum gecrackte VCDS-Software keine Option ist', cat:'beratung', catLabel:'Beratung', date:'27. Oktober 2025', reading:'4 Min', gradient:'from-red-700 via-red-600 to-orange-500', gradientCSS:'#991b1b,#ea580c', icon:'warning', visual:<VisualCrack/>,
    sections:[
      {text:'Im Internet kursieren zahlreiche Angebote fuer sogenannte VCDS Cracks. Diese modifizierten Versionen versprechen den vollen Funktionsumfang — kostenlos. Was verlockend klingt, birgt erhebliche Risiken fuer Sie und Ihr Fahrzeug.'},
      {text:'Gecrackte Software schadet mehr als sie nuetzt. Immer.', type:'pullquote'},
      {heading:'Risiko: Schadsoftware', text:'Gecrackte VCDS-Versionen koennen Trojaner, Keylogger und Ransomware enthalten. Mehrere Faelle wurden dokumentiert, in denen Nutzer nach der Installation erpresst wurden.', type:'warning'},
      {heading:'Risiko: Fahrzeugschaden', text:'Fehlerhafte Software kann Steuergeraete irreparabel beschaedigen. Eine falsche Codierung oder ein fehlerhafter Schreibvorgang verursacht Reparaturkosten weit ueber dem Preis eines Originals.', type:'warning'},
      {heading:'Risiko: Strafverfolgung', text:'Die Nutzung von Raubkopien ist in Deutschland strafbar (UrhG §106). Ross-Tech und die Auto-Intern GmbH verfolgen die Verbreitung aktiv.', type:'warning'},
      {heading:'Die bessere Alternative', text:'Ein originales HEX-V2 erhalten Sie ab 294 EUR — inklusive kostenlosem Support, lebenslanger Updates und Zugang zum VCDS-Forum. Bei Auto-Intern sind Sie auf der sicheren Seite.', type:'tip'},
    ],
    related:['qual-der-wahl-vcds','vorsicht-vor-gefaelschten-vcds-interfaces'],
  },
  'qual-der-wahl-vcds': {
    slug:'qual-der-wahl-vcds', title:'HEX-V2 vs. HEX-NET', subtitle:'Der grosse Vergleich — welcher Adapter passt zu Ihnen?', cat:'beratung', catLabel:'Beratung', date:'22. Mai 2025', reading:'5 Min', gradient:'from-blue-700 via-blue-600 to-cyan-500', gradientCSS:'#1d4ed8,#06b6d4', icon:'bolt', visual:<VisualComparison/>,
    sections:[
      {text:'Die Wahl zwischen HEX-V2 und HEX-NET ist die haeufigste Frage an unser Support-Team. Die Antwort: Beide bieten den identischen Funktionsumfang — der Unterschied liegt ausschliesslich in der Hardware.'},
      {text:'Gleiche Software. Gleicher Support. Nur die Verbindung ist anders.', type:'pullquote'},
      {heading:'HEX-V2 — Der Allrounder', text:'Ab 294 EUR. USB-Verbindung, ideal fuer die Garage. Verfuegbar als 3 VIN, 10 VIN oder Unlimited. Neuer 32-Bit-Prozessor, Status-LEDs, mehrplatzfaehig. Die richtige Wahl wenn Sie stationaer arbeiten.', type:'callout'},
      {heading:'HEX-NET — Fuer Profis', text:'Ab 514 EUR. WLAN-Diagnose kabellos, Messwerte waehrend der Fahrt, USB-B-Schraubsicherung. Verfuegbar als 10 VIN oder Unlimited. Die Wahl fuer Werkstaetten und mobile Diagnose.', type:'callout'},
      {heading:'Unsere Empfehlung', text:'Budget im Blick und stationaere Arbeit? HEX-V2. Professionelle Werkstatt, Probefahrten mit Diagnose, maximale Flexibilitaet? HEX-NET. Upgrade von V2 auf NET ist jederzeit moeglich.', type:'tip'},
    ],
    related:['welches-vcds-kaufen','fin-verbrauch-bei-vcds'],
  },
  'fin-verbrauch-bei-vcds': {
    slug:'fin-verbrauch-bei-vcds', title:'FIN-Verbrauch bei VCDS', subtitle:'Welche Funktionen verbrauchen eine FIN und welche nicht?', cat:'beratung', catLabel:'Beratung', date:'4. April 2025', reading:'3 Min', gradient:'from-emerald-700 via-emerald-600 to-teal-500', gradientCSS:'#047857,#14b8a6', icon:'shield', visual:<VisualFIN/>,
    sections:[
      {text:'Die Fahrzeugidentifikationsnummer (FIN) ist ein zentrales Lizenz-Konzept bei VCDS. Je nach Modell koennen Sie 3, 10 oder unbegrenzt viele FINs nutzen. Aber: Nicht jede Funktion verbraucht eine FIN.'},
      {heading:'Ohne FIN-Verbrauch', text:'Auto-Scan, Fehlerspeicher auslesen und loeschen, Messwertbloecke anzeigen, Klartext-Fehlercodes lesen — all das funktioniert mit beliebig vielen Fahrzeugen, unabhaengig vom Lizenzmodell.', type:'callout'},
      {heading:'Mit FIN-Verbrauch', text:'Codierungen, Anpassungen, Grundeinstellungen, Gateway-Verbauliste, Zugriffsberechtigungen, Stellglied-Diagnosen. Erst bei der ersten Nutzung an einem neuen Fahrzeug wird ein FIN-Slot belegt.'},
      {text:'Upgrade von 3 auf 10 VIN oder Unlimited ist jederzeit moeglich — ohne Hardware-Tausch. Nur eine neue Lizenz aufspielen.', type:'tip'},
    ],
    related:['qual-der-wahl-vcds','welches-vcds-kaufen'],
  },
  'welches-vcds-kaufen': {
    slug:'welches-vcds-kaufen', title:'Welches VCDS kaufen?', subtitle:'Einsatzzweck, Fahrzeuganzahl und Budget', cat:'beratung', catLabel:'Beratung', date:'5. Februar 2025', reading:'6 Min', gradient:'from-violet-700 via-violet-600 to-purple-500', gradientCSS:'#6d28d9,#a855f7', icon:'search', visual:null,
    sections:[
      {text:'Die Auswahl des richtigen VCDS-Adapters haengt von drei Faktoren ab: Ihrem Einsatzzweck, der Anzahl Ihrer Fahrzeuge und Ihrem Budget.'},
      {heading:'Privatanwender (1-3 Fahrzeuge)', text:'HEX-V2 mit 3 VIN ab 294 EUR. Fuer Hobbyschrauber die gelegentlich Freunden helfen: 10 VIN ab 374 EUR.'},
      {heading:'Ambitionierte Schrauber (4-10 Fahrzeuge)', text:'HEX-V2 mit 10 VIN ab 374 EUR oder HEX-NET mit 10 VIN ab 514 EUR wenn WLAN gewuenscht.'},
      {heading:'Werkstaetten', text:'HEX-V2 Unlimited ab 474 EUR, HEX-NET Unlimited ab 614 EUR. Keine Einschraenkung, voller Funktionsumfang, kabellose Diagnose mit HEX-NET.', type:'callout'},
      {text:'Fragen? Unser Team beraet gerne: +49 (0) 234 58 545 800, Mo-Fr 9-16 Uhr.', type:'tip'},
    ],
    related:['qual-der-wahl-vcds','fin-verbrauch-bei-vcds'],
  },
  'gute-wahl-vcds': {
    slug:'gute-wahl-vcds', title:'Eine gute Wahl', subtitle:'Warum VCDS die Diagnose-Landschaft veraendert hat', cat:'beratung', catLabel:'Beratung', date:'31. Januar 2025', reading:'3 Min', gradient:'from-slate-800 via-slate-700 to-slate-600', gradientCSS:'#1e293b,#475569', icon:'check', visual:null,
    sections:[
      {text:'Seit ueber 15 Jahren ist VCDS das Werkzeug der Wahl fuer die Fahrzeugdiagnose im gesamten VW-Konzern. Ueber 32.445 Fehlercodes im Klartext, Auto-Scan ueber alle Steuergeraete, kostenlose Updates.'},
      {text:'VCDS kommuniziert mit allen Steuergeraeten — nicht nur dem Motor. ABS, Airbags, Klima, Lenkung, Getriebe, Kombiinstrument, Infotainment.', type:'callout'},
      {text:'32.445 Fehlercodes im Klartext. Lebenslange Updates. Kostenloser Support. Das ist VCDS.', type:'pullquote'},
    ],
    related:['qual-der-wahl-vcds','welches-vcds-kaufen'],
  },
  'update-25-3-1': {
    slug:'update-25-3-1', title:'Update 25.3.1', subtitle:'Datenstand: 22. April 2025', cat:'versionshistorie', catLabel:'Release', date:'23. April 2025', reading:'2 Min', gradient:'from-emerald-700 via-green-600 to-lime-500', gradientCSS:'#047857,#84cc16', icon:'download', visual:null,
    sections:[
      {text:'Ross-Tech hat VCDS Version 25.3.1 veroeffentlicht. Alle Nutzer mit einem registrierten Interface koennen das Update kostenlos herunterladen.'},
      {heading:'HEX-NET v3 Support', text:'Die neue HEX-NET v3 Hardware wird vollstaendig unterstuetzt. Schnellere WLAN-Verbindung, verbesserte Stabilitaet bei langen Diagnosesitzungen.', type:'callout'},
      {heading:'Modelljahr 2025+', text:'R-Mode Kompatibilitaet fuer die neuesten VW-Plattformen. Neue und aktualisierte Label-Dateien fuer aktuelle Modelle.'},
      {text:'Kostenlos herunterladen auf unserer Download-Seite. Einfach ueber die bestehende Version installieren.', type:'tip'},
    ],
    related:['gute-wahl-vcds'],
  },
  'vorsicht-vor-gefaelschten-vcds-interfaces': {
    slug:'vorsicht-vor-gefaelschten-vcds-interfaces', title:'Gefaelschte VCDS-Interfaces', subtitle:'So erkennen Sie Originale und schuetzen sich', cat:'beratung', catLabel:'Beratung', date:'17. Januar 2025', reading:'4 Min', gradient:'from-amber-700 via-amber-600 to-yellow-500', gradientCSS:'#b45309,#eab308', icon:'warning', visual:null,
    sections:[
      {text:'Der Internet-Markt ist ueberschwemmt mit gefaelschten VCDS-Interfaces. Die Preise sind verlockend niedrig — die Konsequenzen koennen teuer werden.'},
      {text:'Keine Updates. Kein Support. Potenzielle Steuergeraete-Schaeden durch fehlerhafte Hardware.', type:'warning'},
      {heading:'Erkennungsmerkmale', text:'Aufkleber-Qualitaet, Schraubentyp, Gehaeuse-Material, Verpackung. Originale haben einen Hologramm-Aufkleber und eine einzigartige Seriennummer. Bei Unsicherheit: Fotos an info@vcds.de senden.'},
      {text:'Kaufen Sie ausschliesslich bei autorisierten Fachhaendlern. Die Auto-Intern GmbH in Bochum ist der offizielle deutsche Vertriebspartner von Ross-Tech.', type:'tip'},
    ],
    related:['warum-kein-vcds-crack','gute-wahl-vcds'],
  },
  'zugriffsberechtigungscodes-was-man-wissen-sollte': {
    slug:'zugriffsberechtigungscodes-was-man-wissen-sollte', title:'Zugriffsberechtigungscodes', subtitle:'PDF kaufen? Nicht mit VCDS.', cat:'beratung', catLabel:'Beratung', date:'21. Oktober 2024', reading:'3 Min', gradient:'from-indigo-700 via-indigo-600 to-blue-500', gradientCSS:'#4338ca,#3b82f6', icon:'cog', visual:null,
    sections:[
      {text:'Zugriffsberechtigungscodes werden von manchen Anbietern als separate PDF-Dokumente verkauft. Bei VCDS ist das unnoetig — die Software zeigt Codes automatisch an, genau dann wenn sie benoetigt werden.'},
      {text:'Just-in-Time. Kein Nachschlagen. Keine PDF. Kein Zusatzkauf.', type:'pullquote'},
      {text:'Drittanbieter verlangen teilweise 20-50 EUR fuer Code-Listen. Bei VCDS ist das inklusive. Sparen Sie sich das Geld.', type:'tip'},
    ],
    related:['fin-verbrauch-bei-vcds','welches-vcds-kaufen'],
  },
}

/* ═══ SECTION RENDERER — Editorial typography ═══ */
function Section({ s }: { s: Sec }) {
  if (s.type === 'pullquote') return (
    <blockquote className="pull-quote relative my-12 ml-6 sm:ml-10 pl-6 sm:pl-8 border-l-[3px] border-blue-500 py-3">
      <p className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug tracking-tight">{s.text}</p>
    </blockquote>
  )
  if (s.type === 'warning') return (
    <div className="bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-500 rounded-r-xl p-5 sm:p-6 flex gap-4 my-8">
      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0"><Icon name="warning" size={18} className="text-red-600" /></div>
      <div>{s.heading && <h3 className="font-extrabold text-red-900 mb-1.5 text-[15px]">{s.heading}</h3>}<p className="text-sm text-red-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  if (s.type === 'callout') return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-l-4 border-blue-500 rounded-r-xl p-5 sm:p-6 flex gap-4 my-8">
      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><Icon name="shield" size={18} className="text-blue-600" /></div>
      <div>{s.heading && <h3 className="font-extrabold text-blue-900 mb-1.5 text-[15px]">{s.heading}</h3>}<p className="text-sm text-blue-800 leading-relaxed">{s.text}</p></div>
    </div>
  )
  if (s.type === 'tip') return (
    <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 border-l-4 border-emerald-500 rounded-r-xl p-5 sm:p-6 flex gap-4 my-8">
      <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"><Icon name="check" size={18} className="text-emerald-600" /></div>
      <div><p className="text-sm text-emerald-800 leading-relaxed font-semibold">{s.text}</p></div>
    </div>
  )
  return (
    <div className="my-6">
      {s.heading && <h2 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">{s.heading}</h2>}
      <p className="text-[17px] text-slate-600 leading-[1.85]">{s.text}</p>
    </div>
  )
}

/* ═══ HARDCODED POST SLUGS — exported for page.tsx to check ═══ */
export const hardcodedSlugs = new Set(Object.keys(P))

/* ═══ PAGE COMPONENT ═══ */
export function BlogPostClient({ slug }: { slug: string }) {
  const post = P[slug]
  if (!post) notFound()
  const related = post.related.map(s => P[s]).filter(Boolean)

  return (
    <>
      <ReadingProgress />
      <main id="main">
        {/* ═══ IMMERSIVE HERO — with circuit-board overlay + grain ═══ */}
        <section className={`bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 circuit-pattern" />
          <div className="absolute inset-0 grain" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-10 pb-10 md:pt-16 md:pb-14 relative">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-8">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Start</Link>
              <span className="text-white/25">/</span>
              <Link href="/blog" className="text-white/50 hover:text-white/80 transition-colors">Blog</Link>
              <span className="text-white/25">/</span>
              <span className="text-white/70 font-medium">{post.catLabel}</span>
            </div>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-bold text-white/90 tracking-wide border border-white/10">
                  {post.catLabel}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <Icon name="clock" size={11} className="text-white/40" /> {post.reading} Lesezeit
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-[1.1] tracking-tight">{post.title}</h1>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">{post.subtitle}</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white/80">AI</div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Auto-Intern GmbH</p>
                  <p className="text-xs text-white/40">{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SVG ILLUSTRATION — floats over hero/content boundary ═══ */}
        {post.visual && (
          <div className="max-w-4xl mx-auto px-4 sm:px-5 -mt-6 md:-mt-10 relative z-10">
            <div className="hero-svg-wrap rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              {post.visual}
            </div>
          </div>
        )}

        {/* ═══ ARTICLE BODY — Editorial prose ═══ */}
        <article id="article-body" className="max-w-3xl mx-auto px-4 sm:px-5 py-10 md:py-14">
          <div className="article-prose">
            {post.sections.map((s, i) => <Section key={i} s={s} />)}
          </div>

          {/* Elegant divider */}
          <div className="my-14 flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {/* ═══ SHOP CTA — Dark industrial card ═══ */}
          <div className="relative overflow-hidden bg-slate-950 rounded-2xl p-8 sm:p-10 text-center text-white mb-12">
            <div className="absolute inset-0 circuit-pattern opacity-40" />
            <div className="absolute inset-0 grain" />
            <div className="relative">
              <h3 className="text-xl font-extrabold mb-2 tracking-tight">Interesse geweckt?</h3>
              <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">Alle VCDS Diagnoseadapter erhaeltlich im Auto-Intern Shop — mit kostenlosem Support aus Bochum.</p>
              <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 active:bg-red-700 transition-colors text-sm">
                Im Shop bestellen <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pb-10 border-b border-slate-200 mb-12">
            <span className="text-sm font-bold text-slate-500 tracking-wide uppercase text-[11px]">Teilen</span>
            <div className="flex gap-2">
              {['Forum','E-Mail','Link kopieren'].map(s => (
                <button key={s} className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors min-h-[40px] border border-slate-200/50">{s}</button>
              ))}
            </div>
          </div>

          {/* ═══ RELATED ARTICLES ═══ */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Weiterlesen</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(rp => (
                  <Link key={rp.slug} href={'/blog/'+rp.slug}
                    className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`h-28 bg-gradient-to-br ${rp.gradient} relative flex items-center justify-center overflow-hidden grain`}>
                      <div className="absolute inset-0 circuit-pattern" />
                      <Icon name={rp.icon} size={28} className="text-white/70 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors tracking-tight">{rp.title}</h3>
                      <p className="text-xs text-slate-500 flex-1 line-clamp-2">{rp.subtitle}</p>
                      <span className="mt-3 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        Lesen <Icon name="arrow" size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}
