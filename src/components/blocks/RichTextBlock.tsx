import { lexicalToHtml } from '@/lib/serializeLexical'

interface RichTextBlockProps {
  content: Parameters<typeof lexicalToHtml>[0]
}

export function RichTextBlockComponent({ content }: RichTextBlockProps) {
  const html = lexicalToHtml(content)
  if (!html) return null
  return (
    <div className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
