import { Icon } from '@/components/Icon'

interface CTABlockProps {
  heading: string
  text?: string
  buttonLabel: string
  buttonLink: string
  buttonVariant?: string
  isExternal?: boolean
  style?: 'light' | 'dark' | 'primary'
}

export function CTABlockComponent({ heading, text, buttonLabel, buttonLink, isExternal, style = 'light' }: CTABlockProps) {
  const isDark = style === 'dark'
  const isPrimary = style === 'primary'

  const bgClass = isDark
    ? 'bg-slate-950 text-white'
    : isPrimary
    ? 'bg-blue-600 text-white'
    : 'bg-slate-50 text-slate-900 border border-slate-200'

  const linkProps = isExternal ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <div className={`relative overflow-hidden rounded-2xl p-8 sm:p-10 text-center my-10 ${bgClass}`}>
      {(isDark || isPrimary) && (
        <>
          <div className="absolute inset-0 circuit-pattern opacity-40" />
          <div className="absolute inset-0 grain" />
        </>
      )}
      <div className="relative">
        <h3 className="text-xl font-extrabold mb-2 tracking-tight">{heading}</h3>
        {text && <p className={`text-sm mb-6 max-w-md mx-auto ${isDark || isPrimary ? 'text-white/60' : 'text-slate-500'}`}>{text}</p>}
        <a
          href={buttonLink}
          {...linkProps}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 active:bg-red-700 transition-colors text-sm"
        >
          {buttonLabel} <Icon name="arrow" size={14} />
        </a>
      </div>
    </div>
  )
}
