import { cn } from '@/lib/utils'
import { BreadcrumbSchema } from '@/components/StructuredData'
import Link from 'next/link'

interface CrumbItem {
  label: string
  /** Optional override for the crumb's href. If omitted, falls back to the static map below. */
  href?: string
}

interface PageHeroProps {
  /** Legacy string API: "Start / Blog / VCDS Adapter". Split by ' / '. */
  breadcrumb?: string
  /** Preferred API: explicit array of crumbs with per-item href overrides. */
  crumbs?: CrumbItem[]
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

/**
 * Maps breadcrumb labels to their href paths. Covers every public route under
 * `src/app/(app)/*` so the legacy string API produces correct hrefs without
 * each caller having to pass the `crumbs` prop.
 */
const crumbPaths: Record<string, string> = {
  'Start': '/',
  'Startseite': '/',
  'Blog': '/blog',
  'Produkte': '/produkte',
  'Hilfe & FAQ': '/faq',
  'FAQ': '/faq',
  'Kaufberatung': '/kaufberatung',
  'Downloads': '/download',
  'Download': '/download',
  'Quickstart': '/quickstart',
  'Einrichtung': '/quickstart',
  'Fachhändler': '/fachhaendler',
  'Fachhaendler': '/fachhaendler',
  'Fernwartung': '/fernwartung',
  'Troubleshooting': '/troubleshooting',
  'Fehlerbehebung': '/troubleshooting',
  'AHK-Codieren': '/ahk-codieren',
  'AHK Codieren': '/ahk-codieren',
  'Über VCDS': '/ueber-vcds',
  'Ueber VCDS': '/ueber-vcds',
  'Upgrade': '/upgrade',
  'User Map': '/usermap',
  'Usermap': '/usermap',
  'Kontakt': '/kontakt',
  'Datenschutz': '/datenschutz',
  'Impressum': '/impressum',
}

function resolveCrumbs(
  breadcrumb: string | undefined,
  crumbs: CrumbItem[] | undefined,
): CrumbItem[] {
  if (crumbs && crumbs.length > 0) return crumbs
  if (!breadcrumb) return []
  return breadcrumb
    .split(' / ')
    .filter(Boolean)
    .map((label) => ({ label }))
}

function hrefFor(crumb: CrumbItem): string {
  if (crumb.href) return crumb.href
  return crumbPaths[crumb.label] || `/${crumb.label.toLowerCase().replace(/\s+/g, '-')}`
}

export function PageHero({ breadcrumb, crumbs: crumbsProp, title, description, children, className }: PageHeroProps) {
  const crumbs = resolveCrumbs(breadcrumb, crumbsProp)

  // Build structured data items
  const schemaItems = crumbs.map((crumb) => ({
    name: crumb.label,
    url: hrefFor(crumb),
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
              <li key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-slate-600">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-primary-300">{crumb.label}</span>
                ) : (
                  <Link href={hrefFor(crumb)} className="hover:text-white transition-colors duration-200">
                    {crumb.label}
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
