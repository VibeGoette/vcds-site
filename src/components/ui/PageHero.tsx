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
    <section className={cn('bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20', className)}>
      <BreadcrumbSchema items={schemaItems} />
      <div className="max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1.5 text-xs text-slate-400">
            {crumbs.map((crumb, i) => (
              <li key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-slate-300">{crumb}</span>
                ) : (
                  <Link href={crumbPaths[crumb] || '/'} className="hover:text-white transition-colors">
                    {crumb}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        {description && <p className="text-slate-300 max-w-xl">{description}</p>}
        {children}
      </div>
    </section>
  )
}
