import { getPostBySlug } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { Markdown } from '@/components/Markdown'
import { BlogPostClient, hardcodedSlugs } from './BlogPostClient'
import { BlockRenderer } from '@/components/blocks'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { lexicalToHtml, extractLexicalHeadings } from '@/lib/serializeLexical'
import { extractMarkdownHeadings } from '@/lib/markdown'
import { calculateReadingTime } from '@/lib/blog-utils'
import Link from 'next/link'
import Image from 'next/image'
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
  const readingTime = calculateReadingTime(post as Parameters<typeof calculateReadingTime>[0])

  // Determine content type and extract headings
  const hasBlocks = Array.isArray(post.layout) && post.layout.length > 0
  const hasChangelog = !!post.changelog
  const hasRichText = !!post.content

  let headings: Array<{ id: string; text: string; level: number }> = []
  if (hasBlocks) {
    // Extract headings from richText blocks
    for (const block of post.layout as Array<{ blockType: string; content?: unknown }>) {
      if (block.blockType === 'richText' && block.content) {
        headings.push(...extractLexicalHeadings(block.content as Parameters<typeof extractLexicalHeadings>[0]))
      }
    }
  } else if (hasChangelog) {
    headings = extractMarkdownHeadings(post.changelog as string)
  } else if (hasRichText) {
    headings = extractLexicalHeadings(post.content as Parameters<typeof extractLexicalHeadings>[0])
  }

  // Featured image
  const featuredImage = post.featuredImage && typeof post.featuredImage === 'object' && 'url' in post.featuredImage
    ? post.featuredImage as { url: string; alt?: string; width?: number; height?: number }
    : null

  // Author
  const author = post.author && typeof post.author === 'object' && 'name' in post.author
    ? post.author as { name?: string; email?: string; role?: string }
    : null
  const authorName = author?.name ?? 'Auto-Intern GmbH'
  const authorInitials = authorName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  // Related posts
  const relatedPosts = Array.isArray(post.relatedPosts)
    ? (post.relatedPosts.filter((rp: unknown) => typeof rp === 'object' && rp !== null) as Array<{ id?: string; title?: string; slug?: string; excerpt?: string | null; category?: string }>)
    : []

  return (
    <>
      <Header />
      <ReadingProgress />
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
                <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <Icon name="clock" size={11} className="text-white/40" /> {readingTime} Min Lesezeit
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-[1.1] tracking-tight">{post.title}</h1>
              {post.excerpt && <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">{post.excerpt}</p>}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white/80">{authorInitials}</div>
                <div>
                  <p className="text-sm font-semibold text-white/80">{authorName}</p>
                  <p className="text-xs text-white/40">{date}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURED IMAGE ═══ */}
        {featuredImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-5 -mt-6 md:-mt-10 relative z-10">
            <div className="hero-svg-wrap rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt ?? post.title}
                width={featuredImage.width ?? 1200}
                height={featuredImage.height ?? 675}
                className="w-full h-auto"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        )}

        {/* ═══ CONTENT AREA with ToC ═══ */}
        <div className={`max-w-6xl mx-auto px-4 sm:px-5 py-10 md:py-14 ${headings.length >= 2 ? 'lg:grid lg:grid-cols-[220px_1fr] lg:gap-10' : ''}`}>
          {/* Table of Contents (desktop sidebar) */}
          {headings.length >= 2 && <TableOfContents headings={headings} />}

          <article id="article-body" className="max-w-3xl">
            {/* Mobile ToC */}
            {headings.length >= 2 && (
              <div className="lg:hidden">
                <TableOfContents headings={headings} />
              </div>
            )}

            {/* ═══ CONTENT RENDERING ═══ */}
            <div className="article-prose">
              {hasBlocks ? (
                <BlockRenderer blocks={post.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
              ) : hasChangelog ? (
                <Markdown content={post.changelog as string} />
              ) : hasRichText ? (
                <div dangerouslySetInnerHTML={{ __html: lexicalToHtml(post.content as Parameters<typeof lexicalToHtml>[0]) }} />
              ) : post.excerpt ? (
                <p className="text-[17px] text-slate-600 leading-[1.85] my-4">{post.excerpt}</p>
              ) : null}
            </div>

            {/* Author Bio */}
            {author && <AuthorBio name={authorName} role={author.role} />}

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

            {/* Share Buttons */}
            <ShareButtons title={post.title} slug={slug} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />

            {/* Back to blog */}
            <div className="text-center mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                <Icon name="arrow" size={12} className="rotate-180" /> Zurück zum Blog
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
