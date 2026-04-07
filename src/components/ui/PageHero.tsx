import { cn } from '@/lib/utils'
import { BreadcrumbSchema } from '@/components/StructuredData'
import Link from 'next/link'

interface PageHeroProps {
  breadcrumb: string
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

/** Maps breadcrumb labels to their href paths */
const crumbPaths: Record<string, string> = {
  'Start': '/',
  'Startseite': '/',
  'Blog': '/blog',
  'Produkte': '/produkte',
  'Hilfe & FAQ': '/faq',
}

export function PageHero({ breadcrumb, title, description, children, className }: PageHeroProps) {
  const crumbs = breadcrumb.split(' / ').filter(Boolean)

  // Build structured data items
  const schemaItems = crumbs.map(crumb => ({
    name: crumb,
    url: crumbPaths[crumb] || `/${crumb.toLowerCase().replace(/\s+/g, '-')}`,
  }))

  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-primary-900 text-white px-5 py-14 md:py-20', className)}>
      {/* Circuit board pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-60" aria-hidden="true" />
      {/* Grain texture for depth */}
      <div className="absolute inset-0 grain-subtle" aria-hidden="true" />
      {/* Subtle gradient glow from primary color */}
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary-600/8 blur-3xl" aria-hidden="true" />

      <BreadcrumbSchema items={schemaItems} />
      <div className="max-w-6xl mx-auto relative">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-slate-400">
            {crumbs.map((crumb, i) => (
              <li key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-primary-300">{crumb}</span>
                ) : (
                  <Link href={crumbPaths[crumb] || '/'} className="hover:text-white transition-colors duration-200">
                    {crumb}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">{title}</h1>
        {description && <p className="text-slate-300 max-w-xl text-base md:text-lg leading-relaxed">{description}</p>}
        {children}
      </div>
    </section>
  )
}
