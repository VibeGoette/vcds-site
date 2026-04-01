import { getPostBySlug } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { Markdown } from '@/components/Markdown'
import { BlogPostClient, hardcodedSlugs } from './BlogPostClient'
import Link from 'next/link'
import type { Metadata } from 'next'

const catLabels: Record<string, string> = {
  beratung: 'Beratung',
  versionshistorie: 'Release',
  anleitungen: 'Anleitung',
  news: 'News',
  mini: 'Mini',
}

const catGradients: Record<string, string> = {
  beratung: 'from-blue-700 via-blue-600 to-cyan-500',
  versionshistorie: 'from-emerald-700 via-green-600 to-lime-500',
  anleitungen: 'from-purple-700 via-purple-600 to-pink-500',
  news: 'from-amber-700 via-amber-600 to-yellow-500',
  mini: 'from-slate-700 via-slate-600 to-slate-500',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  if (hardcodedSlugs.has(slug)) return {}

  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null
  try {
    post = await getPostBySlug(slug)
  } catch {
    // DB not available
  }
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Hardcoded posts use the existing client component, wrapped with server Header/Footer
  if (hardcodedSlugs.has(slug)) {
    return (
      <>
        <Header />
        <BlogPostClient slug={slug} />
        <Footer />
      </>
    )
  }

  // CMS-driven post
  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null
  try {
    post = await getPostBySlug(slug)
  } catch {
    // DB not available
  }
  if (!post) notFound()

  const gradient = catGradients[post.category] ?? catGradients.beratung
  const catLabel = catLabels[post.category] ?? 'Blog'
  const date = formatDate(post.publishedAt)

  return (
    <>
      <Header />
      <main id="main">
        {/* ═══ HERO ═══ */}
        <section className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 circuit-pattern" />
          <div className="absolute inset-0 grain" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-10 pb-10 md:pt-16 md:pb-14 relative">
            <div className="flex items-center gap-2 text-xs mb-8">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Start</Link>
              <span className="text-white/25">/</span>
              <Link href="/blog" className="text-white/50 hover:text-white/80 transition-colors">Blog</Link>
              <span className="text-white/25">/</span>
              <span className="text-white/70 font-medium">{catLabel}</span>
            </div>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-bold text-white/90 tracking-wide border border-white/10">
                  {catLabel}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-[1.1] tracking-tight">{post.title}</h1>
              {post.excerpt && <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">{post.excerpt}</p>}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white/80">AI</div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Auto-Intern GmbH</p>
                  <p className="text-xs text-white/40">{date}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ARTICLE BODY ═══ */}
        <article id="article-body" className="max-w-3xl mx-auto px-4 sm:px-5 py-10 md:py-14">
          {/* Changelog / Markdown content */}
          {post.changelog ? (
            <div className="article-prose">
              <Markdown content={post.changelog} />
            </div>
          ) : post.excerpt ? (
            <div className="article-prose">
              <p className="text-[17px] text-slate-600 leading-[1.85] my-4">{post.excerpt}</p>
            </div>
          ) : null}

          {/* Divider */}
          <div className="my-14 flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {/* Shop CTA */}
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

          {/* Back to blog */}
          <div className="text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Icon name="arrow" size={12} className="rotate-180" /> Zurück zum Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
