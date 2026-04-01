import { renderMarkdown } from '@/lib/markdown'

export function Markdown({ content }: { content: string }) {
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
