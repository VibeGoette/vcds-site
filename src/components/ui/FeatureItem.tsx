import { cn } from '@/lib/utils'
import { Icon } from '@/components/Icon'

interface FeatureItemProps {
  icon?: string
  iconColor?: string
  children: React.ReactNode
  className?: string
}

export function FeatureItem({ icon = 'check', iconColor = 'text-primary-500', children, className }: FeatureItemProps) {
  return (
    <div className={cn('flex gap-2 text-sm text-slate-600', className)}>
      <Icon name={icon} size={14} className={cn(iconColor, 'shrink-0 mt-0.5')} />
      <span>{children}</span>
    </div>
  )
}
