import { Icon } from '@/components/Icon'
import Link from 'next/link'

interface Product {
  id?: string
  title?: string
  slug?: string
  shortDescription?: string
  price?: string
  connection?: string
}

interface ProductGridBlockProps {
  heading?: string
  products?: Product[] | null
  columns?: '2' | '3' | '4'
}

const colsClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export function ProductGridBlockComponent({ heading, products, columns = '3' }: ProductGridBlockProps) {
  if (!products || products.length === 0) return null

  return (
    <div className="my-10">
      {heading && <h3 className="text-lg font-bold text-slate-800 mb-4">{heading}</h3>}
      <div className={`grid gap-4 ${colsClass[columns]}`}>
        {products.map((product) => (
          <Link
            key={product.id ?? product.slug}
            href={`/produkte`}
            className="group flex flex-col rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name="plug" size={16} className="text-blue-500" />
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{product.title}</h4>
            </div>
            {product.shortDescription && <p className="text-xs text-slate-500 flex-1 mb-3">{product.shortDescription}</p>}
            {product.price && <p className="text-sm font-bold text-blue-600">{product.price}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
