/**
 * Extract plain text from Lexical rich text JSON.
 * Used for simple text rendering (e.g. FAQ answers).
 */

interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
}

interface LexicalRichText {
  root?: { children: LexicalNode[] }
}

export function lexicalToText(richText: LexicalRichText | null | undefined): string {
  if (!richText?.root?.children) return ''
  return extractText(richText.root.children)
}

function extractText(nodes: LexicalNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') return node.text ?? ''
      if (node.type === 'linebreak') return '\n'
      if (node.type === 'link') return extractText(node.children ?? [])
      if (node.children) {
        const inner = extractText(node.children)
        if (node.type === 'paragraph') return inner + '\n'
        if (node.type === 'listitem') return '• ' + inner + '\n'
        return inner
      }
      return ''
    })
    .join('')
    .trim()
}
