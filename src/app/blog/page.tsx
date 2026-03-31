import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'VCDS Blog: Kaufberatung, Versionshistorie, Anleitungen und Tipps rund um VCDS, HEX-V2 und HEX-NET.',
}

const categories: Record<string, { label: string; color: string }> = {
  beratung: { label: 'Beratung', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  versionshistorie: { label: 'Versionshistorie', color: 'bg-green-50 text-green-700 border-green-200' },
  anleitungen: { label: 'Anleitungen', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  news: { label: 'News', color: 'bg-purple-50 text-purple-700 border-purple-200' },
}

const posts = [
  {
    slug: 'warum-kein-vcds-crack',
    title: 'VCDS Crack Download Deutsch',
    category: 'beratung',
    date: '27.10.2025',
    excerpt: 'VCDS Cracks in Deutschland? Kann das legal sein? Nein? Ist es denn wenigstens risikoarm fuer die Nutzer? Auch nicht. Erfahren Sie warum.',
  },
  {
    slug: 'qual-der-wahl-vcds',
    title: 'HEX-V2 vs. HEX-NET \u2013 Die Qual der Wahl!',
    category: 'beratung',
    date: '22.05.2025',
    excerpt: 'Was finden Sie wichtiger? Ein kabelloses System oder ist doch der Preis ausschlaggebend? Wir helfen Ihnen bei der Entscheidung.',
  },
  {
    slug: 'fin-verbrauch-bei-vcds',
    title: 'FIN-Verbrauch bei VCDS \u2013 Komplette Liste der Funktionen & Tipps',
    category: 'beratung',
    date: '04.04.2025',
    excerpt: 'Erfahren Sie, welche Funktionen eine FIN verbrauchen und wie Sie Ihr Interface optimal nutzen.',
  },
  {
    slug: 'welches-vcds-kaufen',
    title: 'Fragen zum Kauf? \u2013 Welches VCDS Geraet ist das richtige?',
    category: 'beratung',
    date: '05.02.2025',
    excerpt: 'Welches VCDS Geraet ist passend? Erfahren Sie das Wesentliche, um eine solide Kaufentscheidung treffen zu koennen.',
  },
  {
    slug: 'gute-wahl-vcds',
    title: 'Eine gute Wahl fuer Diagnosearbeiten bei VW, Audi & Co.',
    category: 'beratung',
    date: '31.01.2025',
    excerpt: 'VCDS hat die Fahrzeugdiagnose-Landschaft nachhaltig veraendert. Erfahren Sie, wie VCDS funktioniert und welche Vorteile es bietet.',
  },
  {
    slug: 'zugriffsberechtigungscodes-was-man-wissen-sollte',
    title: 'Zugriffsberechtigungscodes \u2013 PDF notwendig fuer VCDS?',
    category: 'beratung',
    date: '21.10.2024',
    excerpt: 'Zugriffsberechtigungscodes sind ein zentraler Bestandteil der Arbeit mit VCDS. Viele Missverstaendnisse fuehren oft zu Verwirrung.',
  },
  {
    slug: 'update-25-3-1',
    title: 'Update 25.3.1 \u2013 Datenstand: 22.04.2025',
    category: 'versionshistorie',
    date: '23.04.2025',
    excerpt: 'Neues VCDS-Update: HEX-NET v3 Support, Modelljahr 2025+ (R-Mode), ueberarbeitete Druckfunktion.',
  },
  {
    slug: 'vorsicht-vor-gefaelschten-vcds-interfaces',
    title: 'Vorsicht vor gefaelschten VCDS-Interfaces',
    category: 'beratung',
    date: '17.01.2025',
    excerpt: 'Clone-Produkte taeuschen mit niedrigeren Preisen, verursachen jedoch haeufig fehlerhafte Diagnosen und koennen Steuergeraete beschaedigen.',
  },
]

export default function Blog() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-slate-400 mb-3">Start / Blog</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">VCDS Blog</h1>
            <p className="text-slate-300 max-w-xl">Kaufberatung, Versionshistorie, Anleitungen und Tipps rund um VCDS, HEX-V2 und HEX-NET.</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 py-12">
          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <span className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-600 text-white">Alle</span>
            {Object.values(categories).map(function(c) {
              return <span key={c.label} className={'shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ' + c.color}>{c.label}</span>
            })}
          </div>

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(function(post) {
              var cat = categories[post.category] || categories.beratung
              return (
                <Link key={post.slug} href={'/blog/' + post.slug} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                  {/* Placeholder header */}
                  <div className="bg-gradient-to-br from-slate-100 to-blue-50 h-36 flex items-center justify-center">
                    <Icon name="quote" size={28} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={'px-2 py-0.5 text-[10px] font-semibold rounded-md border ' + cat.color}>{cat.label}</span>
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 font-medium">
                      <span>Weiterlesen</span>
                      <Icon name="arrow" size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
