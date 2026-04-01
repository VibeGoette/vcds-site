interface StatsItem {
  value: string
  label: string
  suffix?: string
}

interface StatsBlockProps {
  items: StatsItem[]
}

export function StatsBlockComponent({ items }: StatsBlockProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="my-10 bg-slate-900 rounded-2xl p-8 sm:p-10">
      <div className={`grid gap-6 sm:grid-cols-${Math.min(items.length, 3)}`}>
        {items.map((item) => (
          <div key={item.label} className="text-center p-4 rounded-xl border border-white/10">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-1">
              {item.value}{item.suffix}
            </p>
            <p className="text-sm text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
