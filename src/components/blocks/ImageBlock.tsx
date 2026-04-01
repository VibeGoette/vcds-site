import Image from 'next/image'

interface ImageBlockProps {
  image: { url?: string; alt?: string; width?: number; height?: number } | null
  caption?: string
  size?: 'full' | 'medium' | 'small'
}

const sizeClasses: Record<string, string> = {
  full: 'max-w-none -mx-4 sm:-mx-5 lg:-mx-16',
  medium: 'max-w-[720px] mx-auto',
  small: 'max-w-[480px] mx-auto',
}

export function ImageBlockComponent({ image, caption, size = 'full' }: ImageBlockProps) {
  if (!image?.url) return null

  return (
    <figure className={`my-8 ${sizeClasses[size] ?? ''}`}>
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={image.url}
          alt={image.alt || 'Bild'}
          width={image.width ?? 1200}
          height={image.height ?? 675}
          className="w-full h-auto"
          sizes={size === 'full' ? '100vw' : size === 'medium' ? '720px' : '480px'}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-slate-500 mt-3 italic">{caption}</figcaption>
      )}
    </figure>
  )
}
