import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-btn transition-all duration-200 ease-out hover:translate-y-[-1px] hover:shadow-md active:translate-y-[0.5px] active:shadow-sm disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700 shadow-sm shadow-accent-900/20',
        secondary: 'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 shadow-sm shadow-primary-900/20',
        outline: 'border border-slate-200 text-slate-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200',
        'outline-white': 'border border-white/20 text-white hover:bg-white/5',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:shadow-none',
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
  loading?: boolean
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

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export function Button({ variant, size, className, children, loading, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  const content = loading ? (
    <>
      <Spinner />
      <span>{children}</span>
    </>
  ) : (
    children
  )

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  const { asChild, ...rest } = props as ButtonAsButton
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={classes} disabled={loading || rest.disabled} {...rest}>
      {content}
    </Comp>
  )
}

export { buttonVariants }
