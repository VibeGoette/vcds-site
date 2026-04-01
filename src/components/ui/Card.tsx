import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('bg-white border rounded-2xl transition-colors', {
  variants: {
    variant: {
      default: 'border-slate-200',
      interactive: 'border-slate-200 hover:border-blue-200 hover:shadow-md',
      muted: 'bg-slate-50 border-slate-200',
    },
    padding: {
      tight: 'p-4 sm:p-5',
      default: 'p-5 sm:p-6',
      spacious: 'p-6 sm:p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
})

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode
  className?: string
}

export function Card({ variant, padding, className, children }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)}>
      {children}
    </div>
  )
}
