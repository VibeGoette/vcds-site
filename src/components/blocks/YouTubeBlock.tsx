interface YouTubeBlockProps {
  videoId: string
  title: string
  aspectRatio?: '16:9' | '4:3'
}

export function YouTubeBlockComponent({ videoId, title, aspectRatio = '16:9' }: YouTubeBlockProps) {
  const paddingBottom = aspectRatio === '4:3' ? '75%' : '56.25%'

  return (
    <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full" style={{ paddingBottom }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          aria-label={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}
