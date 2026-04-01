import { Icon } from '@/components/Icon'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id?: string
  title?: string
  name?: string
  slug?: string
  shortDescription?: string
  price?: string
  connection?: string
  featuredImage?: { url?: string; alt?: string; sizes?: { card?: { url?: string } } } | null
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
        {products.map((product) => {
          const name = product.name ?? product.title ?? ''
          const img = product.featuredImage && typeof product.featuredImage === 'object' && product.featuredImage.url
            ? product.featuredImage
            : null
          const cardUrl = img?.sizes?.card?.url ?? img?.url

          return (
            <Link
              key={product.id ?? product.slug}
              href="/produkte"
              className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all"
            >
              {cardUrl ? (
                <div className="relative h-36 bg-slate-50">
                  <Image
                    src={cardUrl}
                    alt={img?.alt ?? name}
                    fill
                    className="object-contain p-3"
                    sizes={columns === '4' ? '25vw' : columns === '3' ? '33vw' : '50vw'}
                  />
                </div>
              ) : (
                <div className="h-24 bg-slate-50 flex items-center justify-center">
                  <Icon name="plug" size={28} className="text-slate-300" />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{name}</h4>
                {product.shortDescription && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.shortDescription}</p>}
                {product.price && <p className="text-sm font-bold text-blue-600 mt-2">{product.price}</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
