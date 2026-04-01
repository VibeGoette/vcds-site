import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const sectionVariants = cva('py-16 md:py-20', {
  variants: {
    variant: {
      default: '',
      muted: 'bg-slate-50',
      dark: 'bg-slate-900 text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode
  className?: string
  maxWidth?: 'default' | 'narrow'
}

export function Section({ variant, className, children, maxWidth = 'default' }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ variant }), className)}>
      <div className={cn('mx-auto px-5', maxWidth === 'narrow' ? 'max-w-3xl' : 'max-w-6xl')}>
        {children}
      </div>
    </section>
  )
}
