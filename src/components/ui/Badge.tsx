import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva('inline-flex items-center font-semibold rounded-md border', {
  variants: {
    variant: {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      slate: 'bg-slate-50 text-slate-700 border-slate-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    size: {
      sm: 'px-2 py-0.5 text-[10px]',
      default: 'px-2.5 py-0.5 text-xs',
    },
  },
  defaultVariants: {
    variant: 'blue',
    size: 'sm',
  },
})

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, size, className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  )
}

export { badgeVariants }
