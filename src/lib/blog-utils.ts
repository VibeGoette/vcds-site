import { lexicalToText } from './serializeLexical'

/** Calculate reading time in minutes (~200 words/min for German text) */
export function calculateReadingTime(post: {
  changelog?: string | null
  layout?: Array<{ blockType: string; content?: unknown; text?: string; [key: string]: unknown }> | null
  content?: unknown
  excerpt?: string | null
}): number {
  let text = ''

  if (post.changelog) {
    text = post.changelog
  } else if (post.layout && Array.isArray(post.layout) && post.layout.length > 0) {
    text = post.layout.map((block) => {
      if ((block.blockType === 'richText' || block.blockType === 'callout') && block.content) {
        return lexicalToText(block.content as Parameters<typeof lexicalToText>[0])
      }
      if (block.blockType === 'pullquote' && block.text) {
        return block.text
      }
      return ''
    }).join(' ')
  } else if (post.content) {
    text = lexicalToText(post.content as Parameters<typeof lexicalToText>[0])
  } else if (post.excerpt) {
    text = post.excerpt
  }

  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
