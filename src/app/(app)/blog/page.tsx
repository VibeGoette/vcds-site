import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { getPosts } from '@/lib/payload'
import { calculateReadingTime } from '@/lib/blog-utils'
import Link from 'next/link'
import Image from 'next/image'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('blog', {
  title: 'Blog',
  description: 'VCDS Blog: Kaufberatung, Versionshistorie, Anleitungen und Tipps rund um VCDS, HEX-V2 und HEX-NET.',
})
}

const cats: Record<string, { label: string; bg: string; text: string; border: string }> = {
  beratung: { label: 'Beratung', bg: 'bg-primary-500/10', text: 'text-primary-600', border: 'border-primary-200' },
  versionshistorie: { label: 'Release', bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200' },
  anleitungen: { label: 'Anleitung', bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200' },
  news: { label: 'News', bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200' },
  mini: { label: 'Mini', bg: 'bg-slate-500/10', text: 'text-slate-600', border: 'border-slate-200' },
}

/** Visual styles per slug — gradient, icon, tag for blog cards */
const cardStyles: Record<string, { icon: string; gradient: string; tag?: string }> = {
  'warum-kein-vcds-crack': { icon: 'warning', gradient: 'from-red-600 via-red-500 to-orange-500', tag: 'Wichtig' },
  'qual-der-wahl-vcds': { icon: 'bolt', gradient: 'from-primary-600 via-primary-500 to-cyan-500' },
  'fin-verbrauch-bei-vcds': { icon: 'shield', gradient: 'from-emerald-600 via-emerald-500 to-teal-500' },
  'welches-vcds-kaufen': { icon: 'search', gradient: 'from-violet-600 via-violet-500 to-purple-500' },
  'gute-wahl-vcds': { icon: 'check', gradient: 'from-slate-800 via-slate-700 to-slate-600' },
  'update-25-3-1': { icon: 'download', gradient: 'from-emerald-600 via-green-500 to-lime-500' },
  'vorsicht-vor-gefaelschten-vcds-interfaces': { icon: 'warning', gradient: 'from-amber-600 via-amber-500 to-yellow-500' },
  'zugriffsberechtigungscodes-was-man-wissen-sollte': { icon: 'cog', gradient: 'from-indigo-700 via-indigo-600 to-primary-500' },
}

/** Fallback gradients by category */
const categoryGradients: Record<string, { icon: string; gradient: string }> = {
  beratung: { icon: 'info', gradient: 'from-primary-600 via-primary-500 to-cyan-500' },
  versionshistorie: { icon: 'download', gradient: 'from-emerald-600 via-green-500 to-lime-500' },
  anleitungen: { icon: 'book', gradient: 'from-purple-600 via-purple-500 to-pink-500' },
  news: { icon: 'bolt', gradient: 'from-amber-600 via-amber-500 to-yellow-500' },
  mini: { icon: 'info', gradient: 'from-slate-700 via-slate-600 to-slate-500' },
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default async function Blog() {
  let cmsPosts: Awaited<ReturnType<typeof getPosts>> = []
  try {
    cmsPosts = await getPosts()
  } catch {
    // DB not available
  }

  const posts = cmsPosts.map(p => {
    const style = cardStyles[p.slug] ?? categoryGradients[p.category] ?? categoryGradients.beratung
    const readMins = calculateReadingTime(p as Parameters<typeof calculateReadingTime>[0])
    const featImg = p.featuredImage && typeof p.featuredImage === 'object' && 'url' in p.featuredImage
      ? p.featuredImage as { url: string; alt?: string; width?: number; height?: number }
      : null
    return {
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: formatDate(p.publishedAt),
      reading: `${readMins} Min`,
      excerpt: p.excerpt ?? '',
      icon: style.icon,
      gradient: style.gradient,
      tag: 'tag' in style ? style.tag : undefined,
      featuredImage: featImg,
    }
  })

  const featured = posts[0]
  const secondary = posts.slice(1, 3)
  const rest = posts.slice(3)

  if (!featured) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">Noch keine Blog-Beiträge vorhanden.</div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main id="main">
        {/* ═══ HERO — Dark editorial header with circuit-board texture ═══ */}
        <section className="bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern" />
          <div className="absolute inset-0 grain" />
          <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-12 pb-14 md:pt-16 md:pb-20 relative">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-primary-400">VCDS Blog</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Featured + secondary grid */}
            <div className="grid lg:grid-cols-5 gap-5 md:gap-6">
              {/* Featured — spans 3 cols */}
              <Link href={'/blog/' + featured.slug} className="lg:col-span-3 group block relative rounded-2xl overflow-hidden">
                <div className={`aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br ${featured.gradient} relative grain`}>
                  {featured.featuredImage && (
                    <Image
                      src={featured.featuredImage.url}
                      alt={featured.featuredImage.alt ?? featured.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Large decorative icon */}
                  {!featured.featuredImage && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
                      <Icon name={featured.icon} size={200} className="text-white" />
                    </div>
                  )}
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      {featured.tag && <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded bg-red-500 text-white">{featured.tag}</span>}
                      <span className="text-[11px] text-white/60">{featured.date} · {featured.reading}</span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-extrabold mb-2 leading-tight group-hover:text-primary-300 transition-colors duration-300">
                      {featured.title}
                    </h2>
                    <p className="text-sm md:text-base text-white/60 max-w-lg leading-relaxed hidden sm:block">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary-400 group-hover:gap-3 transition-all duration-300">
                      Artikel lesen <Icon name="arrow" size={14} className="text-primary-400" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Secondary articles — stack in 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-5 md:gap-6">
                {secondary.map(post => {
                  const cat = cats[post.category] || cats.beratung
                  return (
                    <Link key={post.slug} href={'/blog/' + post.slug} className="group flex-1 block relative rounded-2xl overflow-hidden">
                      <div className={`h-full min-h-[200px] bg-gradient-to-br ${post.gradient} relative grain`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
                          <Icon name={post.icon} size={120} className="text-white" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${cat.border} ${cat.bg} ${cat.text}`}>{cat.label}</span>
                            <span className="text-[10px] text-white/50">{post.reading}</span>
                          </div>
                          <h3 className="text-base md:text-lg font-bold leading-snug group-hover:text-primary-300 transition-colors duration-300">{post.title}</h3>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY FILTER — Sticky sub-nav ═══ */}
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-14 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-5">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button className="shrink-0 px-4 py-2 text-xs font-bold rounded-full bg-slate-900 text-white min-h-[36px]">Alle</button>
              {Object.values(cats).map(c => (
                <button key={c.label} className={`shrink-0 px-4 py-2 text-xs font-bold rounded-full border ${c.border} ${c.bg} ${c.text} min-h-[36px] hover:opacity-80 transition-opacity`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ ARTICLE GRID — Staggered animation reveal ═══ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-10 md:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {rest.map(function(post) {
              const cat = cats[post.category] || cats.beratung
              return (
                <Link key={post.slug} href={'/blog/' + post.slug}
                  className="blog-card group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-400">
                  {/* Card header — gradient + large ghost icon + circuit overlay */}
                  <div className={`h-44 sm:h-48 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center overflow-hidden grain`}>
                    <div className="absolute inset-0 circuit-pattern" />
                    {/* Large ghost icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700">
                      <Icon name={post.icon} size={100} className="text-white" />
                    </div>
                    {/* Foreground icon */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-500">
                      <Icon name={post.icon} size={26} className="text-white" />
                    </div>
                    {/* Reading time pill */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-black/25 backdrop-blur-sm rounded-full text-[10px] font-medium text-white/80 flex items-center gap-1.5">
                        <Icon name="clock" size={9} className="text-white/50" />
                        {post.reading}
                      </span>
                    </div>
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${cat.border} ${cat.bg} ${cat.text}`}>
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{post.date}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-[15px] mb-2 group-hover:text-primary-600 transition-colors duration-300 leading-snug tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary-600 group-hover:text-primary-700 transition-colors flex items-center gap-1.5">
                        Weiterlesen
                        <Icon name="arrow" size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                      <span className="text-[9px] text-slate-300 font-bold tracking-wider uppercase">vcds.de</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* ═══ NEWSLETTER CTA — Industrial style ═══ */}
          <div className="mt-16 relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 p-8 md:p-10">
            <div className="absolute inset-0 circuit-pattern opacity-50" />
            <div className="absolute inset-0 grain" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-primary-600/20 flex items-center justify-center border border-primary-500/30 shrink-0">
                <Icon name="mail" size={24} className="text-primary-400" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <p className="text-lg font-bold text-white mb-1">Neue Artikel erhalten</p>
                <p className="text-sm text-slate-400">Updates zu VCDS, neue Blog-Beitraege und Release-Notes — kostenlos, kein Spam.</p>
              </div>
              <span className="px-6 py-3 bg-primary-600 text-white text-sm font-bold rounded-md hover:bg-primary-500 active:bg-primary-700 transition-colors cursor-pointer shrink-0 min-h-[44px] flex items-center">
                Abonnieren
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
