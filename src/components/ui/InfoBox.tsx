import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Icon } from '@/components/Icon'

const infoBoxVariants = cva('rounded-xl p-5 flex gap-3 border', {
  variants: {
    variant: {
      info: 'bg-blue-50 border-blue-100',
      warning: 'bg-amber-50 border-amber-100',
      success: 'bg-green-50 border-green-100',
      danger: 'bg-red-50 border-red-100',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

const iconConfig = {
  info: { name: 'shield', color: 'text-blue-600', bg: 'bg-blue-100', titleColor: 'text-blue-900', textColor: 'text-blue-800' },
  warning: { name: 'warning', color: 'text-amber-600', bg: 'bg-amber-100', titleColor: 'text-amber-900', textColor: 'text-amber-800' },
  success: { name: 'check', color: 'text-green-600', bg: 'bg-green-100', titleColor: 'text-green-900', textColor: 'text-green-800' },
  danger: { name: 'warning', color: 'text-red-600', bg: 'bg-red-100', titleColor: 'text-red-900', textColor: 'text-red-800' },
} as const

interface InfoBoxProps extends VariantProps<typeof infoBoxVariants> {
  title?: string
  icon?: string
  children: React.ReactNode
  className?: string
  /**
   * Explicit ARIA role override. Use this for InfoBoxes that appear dynamically
   * (e.g. form validation errors) — pass "alert" for critical announcements or
   * "status" for polite updates. Default is no role: static InfoBoxes rendered
   * at page load don't need a live-region role (screen readers either ignore
   * them or spam the user on re-renders), and the visual variant already
   * conveys the semantic meaning.
   */
  role?: string
}

export function InfoBox({ variant = 'info', title, icon, children, className, role }: InfoBoxProps) {
  const config = iconConfig[variant!]
  const iconName = icon ?? config.name

  return (
    <div role={role} className={cn(infoBoxVariants({ variant }), className)}>
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', config.bg)}>
        <Icon name={iconName} size={18} className={config.color} />
      </div>
      <div>
        {title && <h3 className={cn('font-bold text-sm mb-1', config.titleColor)}>{title}</h3>}
        <div className={cn('text-sm leading-relaxed', config.textColor)}>{children}</div>
      </div>
    </div>
  )
}
