import { cn } from '@/lib/utils'

interface PageHeroProps {
  breadcrumb: string
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHero({ breadcrumb, title, description, children, className }: PageHeroProps) {
  const crumbs = breadcrumb.split(' / ').filter(Boolean)

  return (
    <section className={cn('bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20', className)}>
      <div className="max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1.5 text-xs text-slate-400">
            {crumbs.map((crumb, i) => (
              <li key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-slate-300">{crumb}</span>
                ) : (
                  <span>{crumb}</span>
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
