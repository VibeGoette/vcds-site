import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Icon } from '@/components/Icon'

const iconBoxVariants = cva('flex items-center justify-center shrink-0', {
  variants: {
    size: {
      sm: 'w-9 h-9',
      default: 'w-11 h-11',
      lg: 'w-14 h-14',
    },
    shape: {
      rounded: 'rounded-xl',
      circle: 'rounded-full',
    },
    color: {
      blue: 'bg-primary-50',
      red: 'bg-accent-50',
      amber: 'bg-amber-50',
      green: 'bg-green-50',
      slate: 'bg-slate-100',
    },
  },
  defaultVariants: {
    size: 'default',
    shape: 'rounded',
    color: 'blue',
  },
})

const iconSizeMap = { sm: 16, default: 20, lg: 24 } as const
const iconColorMap = { blue: 'text-primary-600', red: 'text-accent-600', amber: 'text-amber-600', green: 'text-green-600', slate: 'text-slate-600' } as const

interface IconBoxProps extends VariantProps<typeof iconBoxVariants> {
  icon: string
  className?: string
}

export function IconBox({ icon, size = 'default', shape, color = 'blue', className }: IconBoxProps) {
  return (
    <div className={cn(iconBoxVariants({ size, shape, color }), className)}>
      <Icon name={icon} size={iconSizeMap[size!]} className={iconColorMap[color!]} />
    </div>
  )
}
