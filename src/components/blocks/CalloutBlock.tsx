import { InfoBox } from '@/components/ui/InfoBox'
import { lexicalToHtml } from '@/lib/serializeLexical'

interface CalloutBlockProps {
  variant?: 'info' | 'warning' | 'success' | 'danger'
  title?: string
  content: Parameters<typeof lexicalToHtml>[0]
}

export function CalloutBlockComponent({ variant = 'info', title, content }: CalloutBlockProps) {
  const html = lexicalToHtml(content)

  return (
    <div className="my-8">
      <InfoBox variant={variant} title={title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </InfoBox>
    </div>
  )
}
