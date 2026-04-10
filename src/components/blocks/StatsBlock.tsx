interface StatsItem {
  value: string
  label: string
  suffix?: string
}

interface StatsBlockProps {
  items: StatsItem[]
}

// CQ-04: Tailwind's JIT compiler only sees class names that appear statically
// in source. A template like `sm:grid-cols-${n}` is opaque to the scanner and
// the utility classes get purged from the production build. Enumerate them.
const GRID_COLS_CLASS: Record<1 | 2 | 3, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
}

export function StatsBlockComponent({ items }: StatsBlockProps) {
  if (!items || items.length === 0) return null

  const cols = (Math.min(Math.max(items.length, 1), 3) as 1 | 2 | 3)
  const colsClass = GRID_COLS_CLASS[cols]

  return (
    <div className="my-10 bg-slate-900 rounded-2xl p-8 sm:p-10">
      <div className={`grid gap-6 ${colsClass}`}>
        {items.map((item) => (
          <div key={item.label} className="text-center p-4 rounded-xl border border-white/10">
            <p className="text-3xl md:text-4xl font-extrabold text-primary-400 mb-1">
              {item.value}{item.suffix}
            </p>
            <p className="text-sm text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
