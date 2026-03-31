import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PostData {
  slug: string
  title: string
  category: string
  categoryLabel: string
  date: string
  excerpt: string
  content: string[]
  related: string[]
}

const posts: Record<string, PostData> = {
  'warum-kein-vcds-crack': {
    slug: 'warum-kein-vcds-crack',
    title: 'VCDS Crack Download Deutsch',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '27. Oktober 2025',
    excerpt: 'VCDS Cracks in Deutschland? Kann das legal sein? Nein? Ist es denn wenigstens risikoarm fuer die Nutzer? Auch nicht.',
    content: [
      'Im Internet kursieren zahlreiche Angebote fuer sogenannte VCDS Cracks. Diese modifizierten Versionen versprechen den vollen Funktionsumfang der Originalsoftware \u2013 kostenlos. Was auf den ersten Blick verlockend klingt, birgt erhebliche Risiken.',
      'Gecrackte VCDS-Versionen koennen Schadsoftware enthalten, die Ihren Computer infiziert. Ausserdem erhalten Sie keinerlei Support, keine Updates und riskieren Schaeden an den Steuergeraeten Ihres Fahrzeugs durch fehlerhafte Software.',
      'Die Nutzung von Raubkopien ist in Deutschland strafbar. Ross-Tech und die Auto-Intern GmbH gehen aktiv gegen die Verbreitung gefaelschter Software vor. Schuetzen Sie sich und Ihr Fahrzeug \u2013 kaufen Sie nur originale VCDS-Interfaces bei autorisierten Haendlern.',
      'Ein originales HEX-V2 Interface erhalten Sie bereits ab 294 EUR inklusive kostenlosem Support, kostenloser Updates und Zugang zum VCDS-Forum. Bei der Auto-Intern GmbH sind Sie auf der sicheren Seite.',
    ],
    related: ['qual-der-wahl-vcds', 'vorsicht-vor-gefaelschten-vcds-interfaces'],
  },
  'qual-der-wahl-vcds': {
    slug: 'qual-der-wahl-vcds',
    title: 'HEX-V2 vs. HEX-NET \u2013 Die Qual der Wahl!',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '22. Mai 2025',
    excerpt: 'Was finden Sie wichtiger? Ein kabelloses System oder ist doch der Preis ausschlaggebend?',
    content: [
      'Die Wahl zwischen HEX-V2 und HEX-NET ist eine der haeufigsten Fragen, die unser Support-Team erreicht. Beide Adapter bieten den identischen Funktionsumfang der VCDS-Software \u2013 der Unterschied liegt in der Hardware.',
      'Der HEX-V2 ist die kostenguenstige Variante ab 294 EUR. Er wird per USB-Kabel mit dem Laptop verbunden und eignet sich hervorragend fuer Hobbyschrauber, die hauptsaechlich in der Garage arbeiten. Mit drei VIN-Slots ist er perfekt fuer die Familienflotte.',
      'Der HEX-NET hingegen bietet WLAN-Konnektivitaet. Das bedeutet: kabellose Diagnose, Messwerte waehrend der Fahrt aufnehmen und eine saubere Werkstatt ohne Kabelgewirr. Ab 514 EUR ist er das Must-Have fuer jede professionelle Kfz-Werkstatt.',
      'Unsere Empfehlung: Wenn Sie vorwiegend stationaer arbeiten und ein festes Budget haben, greifen Sie zum HEX-V2. Wenn Sie professionell diagnostizieren oder Messwerte bei Probefahrten benoetigen, fuehrt kein Weg am HEX-NET vorbei.',
    ],
    related: ['welches-vcds-kaufen', 'fin-verbrauch-bei-vcds'],
  },
  'fin-verbrauch-bei-vcds': {
    slug: 'fin-verbrauch-bei-vcds',
    title: 'FIN-Verbrauch bei VCDS \u2013 Komplette Liste der Funktionen & Tipps',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '4. April 2025',
    excerpt: 'Erfahren Sie, welche Funktionen eine FIN verbrauchen und wie Sie Ihr Interface optimal nutzen.',
    content: [
      'Die Fahrzeugidentifikationsnummer (FIN) ist ein zentrales Konzept bei VCDS. Je nach Lizenzmodell koennen Sie 3, 10 oder unbegrenzt viele FINs nutzen. Aber nicht jede Funktion verbraucht eine FIN.',
      'Funktionen ohne FIN-Verbrauch: Auto-Scan erstellen, Fehlerspeicher auslesen und loeschen, Messwerte anzeigen. Diese koennen Sie an beliebig vielen Fahrzeugen durchfuehren \u2013 unabhaengig von Ihrem Lizenzmodell.',
      'Funktionen mit FIN-Verbrauch: Codierungen, Anpassungen, Grundeinstellungen, Gateway-Verbauliste aendern, Zugriffsberechtigungen eingeben und Stellglied-Diagnosen. Erst wenn Sie eine dieser Funktionen an einem neuen Fahrzeug ausfuehren, wird eine FIN belegt.',
      'Tipp: Die FIN wird im Interface gespeichert und laesst sich nicht loeschen. Aber Sie koennen Ihre Lizenz jederzeit kurzfristig erweitern \u2013 ein Upgrade von 3 auf 10 VIN oder auf Unlimited ist ohne Hardware-Tausch moeglich.',
    ],
    related: ['qual-der-wahl-vcds', 'welches-vcds-kaufen'],
  },
  'welches-vcds-kaufen': {
    slug: 'welches-vcds-kaufen',
    title: 'Fragen zum Kauf? \u2013 Welches VCDS Geraet ist das richtige fuer mich?',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '5. Februar 2025',
    excerpt: 'Welches VCDS Geraet ist passend? Erfahren Sie das Wesentliche, um eine solide Kaufentscheidung treffen zu koennen.',
    content: [
      'Die Auswahl des richtigen VCDS-Interfaces haengt von drei Faktoren ab: Ihrem Einsatzzweck, der Anzahl der Fahrzeuge und Ihrem Budget.',
      'Fuer Privatanwender mit 1-3 Fahrzeugen empfehlen wir den HEX-V2 mit 3 VIN-Lizenz. Fuer Hobbyschrauber, die auch Freunden und Bekannten helfen, ist die 10 VIN-Variante ideal. Werkstaetten und professionelle Dienstleister sollten zur Unlimited-Version greifen.',
      'Die Frage USB vs. WLAN ist primaer eine Frage des Komforts. Wenn Sie regelmaessig Probefahrten mit laufender Diagnose durchfuehren, ist das HEX-NET die deutlich bessere Wahl. Fuer alle anderen Einsatzzwecke reicht der HEX-V2 vollkommen aus.',
      'Unser Support-Team beraet Sie gerne telefonisch unter +49 (0) 234 58 545 800. Fragen kostet nichts \u2013 und wir helfen Ihnen, die richtige Entscheidung zu treffen.',
    ],
    related: ['qual-der-wahl-vcds', 'fin-verbrauch-bei-vcds'],
  },
  'gute-wahl-vcds': {
    slug: 'gute-wahl-vcds',
    title: 'Eine gute Wahl fuer Diagnosearbeiten bei VW, Audi & Co.',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '31. Januar 2025',
    excerpt: 'VCDS hat die Fahrzeugdiagnose-Landschaft nachhaltig veraendert.',
    content: [
      'Seit ueber 15 Jahren ist VCDS von Ross-Tech das Werkzeug der Wahl fuer Fahrzeugdiagnose im Volkswagen-Konzern. Was als Nischenprodukt fuer Enthusiasten begann, ist heute in tausenden Werkstaetten weltweit im Einsatz.',
      'Der entscheidende Vorteil von VCDS gegenueber generischen OBD-II-Tools: Es kommuniziert nicht nur mit dem Motor, sondern mit allen Steuergeraeten im Fahrzeug. ABS, Airbags, Klimaanlage, Lenkung, Getriebe, Kombiinstrument \u2013 VCDS erreicht sie alle.',
      'Mit aktuell 32.445 Fehlercodes im Klartext und kostenloser Unterstuetzung durch die Auto-Intern GmbH ist VCDS die beste Investition fuer jeden, der ernsthaft an VW, Audi, Skoda oder Seat arbeitet.',
    ],
    related: ['qual-der-wahl-vcds', 'welches-vcds-kaufen'],
  },
  'update-25-3-1': {
    slug: 'update-25-3-1',
    title: 'Update 25.3.1 \u2013 Datenstand: 22.04.2025',
    category: 'versionshistorie',
    categoryLabel: 'Versionshistorie',
    date: '23. April 2025',
    excerpt: 'Neues VCDS-Update mit HEX-NET v3 Support und ueberarbeiteter Druckfunktion.',
    content: [
      'Ross-Tech hat das Update 25.3.1 mit Datenstand vom 22. April 2025 veroeffentlicht. Die neue Version bringt mehrere wichtige Neuerungen.',
      'HEX-NET v3 Support: Die neue Hardware-Version des HEX-NET wird jetzt vollstaendig unterstuetzt. Modelljahr 2025+ (R-Mode): Erweiterte Kompatibilitaet fuer die neuesten Fahrzeuge der VW-Gruppe.',
      'Weitere Aenderungen: Ueberarbeitete Druckfunktion, verbesserte Label-Dateien und Bugfixes. Laden Sie das Update kostenlos auf unserer Download-Seite herunter.',
    ],
    related: ['gute-wahl-vcds'],
  },
  'vorsicht-vor-gefaelschten-vcds-interfaces': {
    slug: 'vorsicht-vor-gefaelschten-vcds-interfaces',
    title: 'Vorsicht vor gefaelschten VCDS-Interfaces',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '17. Januar 2025',
    excerpt: 'Clone-Produkte taeuschen mit niedrigeren Preisen, verursachen aber haeufig fehlerhafte Diagnosen.',
    content: [
      'Der Markt ist ueberschwemmt mit gefaelschten VCDS-Interfaces, die oft zu vermeintlich guenstigen Preisen angeboten werden. Diese Plagiate koennen eindeutig identifiziert werden und funktionieren meist nur mit der mitgelieferten modifizierten VCDS-Version.',
      'Die Risiken sind erheblich: Keine Software-Updates, kein Support, potenzielle Schaeden an Steuergeraeten und die Moeglichkeit, dass Schadsoftware auf Ihrem Computer installiert wird.',
      'Erkennungsmerkmale fuer Faelschungen: Der Text auf dem Aufkleber, die verwendeten Schrauben, die Qualitaet des Gehaeuses und die Art der Verpackung koennen Hinweise geben. Bei Unsicherheit senden Sie Fotos an info@vcds.de.',
      'Schuetzen Sie sich: Kaufen Sie ausschliesslich bei autorisierten Fachhaendlern. Die Auto-Intern GmbH ist der offizielle Vertriebspartner von Ross-Tech in Deutschland.',
    ],
    related: ['warum-kein-vcds-crack', 'gute-wahl-vcds'],
  },
  'zugriffsberechtigungscodes-was-man-wissen-sollte': {
    slug: 'zugriffsberechtigungscodes-was-man-wissen-sollte',
    title: 'Zugriffsberechtigungscodes \u2013 PDF notwendig fuer VCDS?',
    category: 'beratung',
    categoryLabel: 'Beratung',
    date: '21. Oktober 2024',
    excerpt: 'Zugriffsberechtigungscodes sind ein zentraler Bestandteil der Arbeit mit VCDS.',
    content: [
      'Zugriffsberechtigungscodes werden von VCDS automatisch angezeigt, wenn sie fuer eine bestimmte Codierungs- oder Anpassungsaenderung benoetigt werden. Sie muessen keine separate PDF-Datei kaufen oder herunterladen.',
      'VCDS zeigt den benoetigten Code "just in time" an \u2013 also genau dann, wenn Sie ihn brauchen. Dies ist ein grosser Vorteil gegenueber anderen Diagnosesystemen.',
      'Viele Missverstaendnisse entstehen durch Drittanbieter, die PDF-Dokumente mit Zugriffsberechtigungscodes verkaufen. Diese sind bei Nutzung von VCDS nicht notwendig.',
    ],
    related: ['fin-verbrauch-bei-vcds', 'welches-vcds-kaufen'],
  },
}

// All post slugs for static generation
const allSlugs = Object.keys(posts)

export function generateStaticParams() {
  return allSlugs.map(function(slug) { return { slug: slug } })
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  var post = posts[params.slug]
  if (!post) return { title: 'Beitrag nicht gefunden' }
  return { title: post.title, description: post.excerpt }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  var post = posts[params.slug]
  if (!post) notFound()

  var relatedPosts = post.related.map(function(s) { return posts[s] }).filter(Boolean)

  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Start</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-300">{post.categoryLabel}</span>
            </div>
            <span className={'inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-md border mb-4 ' + (post.category === 'versionshistorie' ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-blue-500/20 text-blue-300 border-blue-400/30')}>
              {post.categoryLabel}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-slate-400 text-sm">{post.date}</p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-5 py-12">
          {/* Excerpt */}
          <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8 pb-8 border-b border-slate-200">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="space-y-5 mb-12">
            {post.content.map(function(p, i) {
              return <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
            })}
          </div>

          {/* CTA */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12 text-center">
            <h3 className="font-bold text-slate-900 mb-2">Interesse geweckt?</h3>
            <p className="text-sm text-slate-600 mb-4">Alle VCDS Diagnoseadapter erhaeltlich im Auto-Intern Shop.</p>
            <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors">
              Im Shop bestellen <Icon name="arrow" size={16} className="text-white" />
            </a>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pb-8 border-b border-slate-200 mb-8">
            <span className="text-sm font-medium text-slate-500">Teilen:</span>
            <div className="flex gap-2">
              {['Forum', 'E-Mail', 'Kopieren'].map(function(s) {
                return <button key={s} className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">{s}</button>
              })}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Verwandte Beitraege</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map(function(rp) {
                  return (
                    <Link key={rp.slug} href={'/blog/' + rp.slug}
                      className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug text-sm">{rp.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{rp.excerpt}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-medium">
                        <span>Lesen</span>
                        <Icon name="arrow" size={12} className="text-blue-600" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
