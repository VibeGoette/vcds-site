import Link from 'next/link'
import { Icon } from '@/components/Icon'

const catGradients: Record<string, string> = {
  beratung: 'from-primary-700 via-primary-600 to-cyan-500',
  versionshistorie: 'from-emerald-700 via-green-600 to-lime-500',
  anleitungen: 'from-purple-700 via-purple-600 to-pink-500',
  news: 'from-amber-700 via-amber-600 to-yellow-500',
  mini: 'from-slate-700 via-slate-600 to-slate-500',
}

const catIcons: Record<string, string> = {
  beratung: 'shield',
  versionshistorie: 'download',
  anleitungen: 'cog',
  news: 'bolt',
  mini: 'clock',
}

interface RelatedPost {
  id?: string
  title?: string
  slug?: string
  excerpt?: string | null
  category?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div>
      <h2 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Weiterlesen</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {posts.slice(0, 4).map((rp) => {
          const gradient = catGradients[rp.category ?? ''] ?? catGradients.beratung
          const icon = catIcons[rp.category ?? ''] ?? 'arrow'

          return (
            <Link
              key={rp.id ?? rp.slug}
              href={`/blog/${rp.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`h-28 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden grain`}>
                <div className="absolute inset-0 circuit-pattern" />
                <Icon name={icon} size={28} className="text-white/70 relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-primary-600 transition-colors tracking-tight">
                  {rp.title}
                </h3>
                {rp.excerpt && <p className="text-xs text-slate-500 flex-1 line-clamp-2">{rp.excerpt}</p>}
                <span className="mt-3 text-xs font-bold text-primary-600 flex items-center gap-1.5">
                  Lesen <Icon name="arrow" size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
