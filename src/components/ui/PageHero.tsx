import { cn } from '@/lib/utils'

interface PageHeroProps {
  breadcrumb: string
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHero({ breadcrumb, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn('bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20', className)}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-slate-400 mb-3">{breadcrumb}</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        {description && <p className="text-slate-300 max-w-xl">{description}</p>}
        {children}
      </div>
    </section>
  )
}
