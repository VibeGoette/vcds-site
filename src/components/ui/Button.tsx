import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-md transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
        secondary: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700',
        outline: 'border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
        'outline-white': 'border border-white/20 text-white hover:bg-white/5',
        ghost: 'text-slate-700 hover:bg-slate-100',
      },
      size: {
        sm: 'px-4 py-2 text-sm gap-1.5',
        default: 'px-6 py-3 text-sm gap-2',
        lg: 'px-8 py-3.5 text-base gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined
  external?: undefined
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type ButtonAsLink = ButtonBaseProps & {
  href: string
  external?: boolean
  asChild?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { asChild, ...rest } = props as ButtonAsButton
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={classes} {...rest}>
      {children}
    </Comp>
  )
}

export { buttonVariants }
