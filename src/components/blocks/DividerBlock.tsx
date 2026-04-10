interface DividerBlockProps {
  style?: 'default' | 'dot' | 'gradient'
}

export function DividerBlockComponent({ style = 'default' }: DividerBlockProps) {
  if (style === 'dot') {
    return (
      <div role="separator" aria-orientation="horizontal" className="my-14 flex items-center justify-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
      </div>
    )
  }

  // default + gradient share the same elegant style
  return (
    <div role="separator" aria-orientation="horizontal" className="my-14 flex items-center gap-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />
      <div className="w-2 h-2 rounded-full bg-slate-300" aria-hidden="true" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />
    </div>
  )
}
