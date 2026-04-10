import { RichTextBlockComponent } from './RichTextBlock'
import { ImageBlockComponent } from './ImageBlock'
import { YouTubeBlockComponent } from './YouTubeBlock'
import { CTABlockComponent } from './CTABlock'
import { CalloutBlockComponent } from './CalloutBlock'
import { PullquoteBlockComponent } from './PullquoteBlock'
import { DividerBlockComponent } from './DividerBlock'
import { FAQBlockComponent } from './FAQBlock'
import { StatsBlockComponent } from './StatsBlock'
import { ProductGridBlockComponent } from './ProductGridBlock'

interface Block {
  id?: string
  blockType: string
  [key: string]: unknown
}

interface BlockRendererProps {
  blocks: Block[]
}

/**
 * Central dispatcher that renders a sequence of Payload CMS blocks.
 *
 * Why this exists: Payload stores page content as a heterogeneous array of
 * block objects, each identified by a `blockType` discriminator string. The
 * generated TypeScript union (`Page['layout'][number]`) does not narrow cleanly
 * through a switch statement because the union members share no common base type
 * that TypeScript can use for exhaustiveness narrowing. As a result, every case
 * must cast its block props with `as` before passing them to the typed component.
 *
 * These are deliberate, localised type assertions — not unsafe casts — because
 * each `case` branch is only reached when `block.blockType` matches the
 * corresponding slug, which guarantees the runtime shape is correct. Keeping the
 * assertions here (rather than inside each block component) means the components
 * themselves stay fully typed and testable in isolation.
 *
 * Unknown block types fall through to `default: return null`, so adding a new
 * block to the CMS schema without a renderer here fails silently (nothing is
 * rendered) rather than throwing at runtime.
 */
export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `block-${i}`

        switch (block.blockType) {
          case 'richText':
            return <RichTextBlockComponent key={key} content={block.content as Parameters<typeof RichTextBlockComponent>[0]['content']} />

          case 'image':
            return <ImageBlockComponent key={key} image={block.image as Parameters<typeof ImageBlockComponent>[0]['image']} caption={block.caption as string} size={block.size as 'full' | 'medium' | 'small'} />

          case 'youtube':
            return <YouTubeBlockComponent key={key} videoId={block.videoId as string} title={block.title as string} aspectRatio={block.aspectRatio as '16:9' | '4:3'} />

          case 'cta':
            return <CTABlockComponent key={key} heading={block.heading as string} headingLevel={block.headingLevel as 'h2' | 'h3' | 'h4'} text={block.text as string} buttonLabel={block.buttonLabel as string} buttonLink={block.buttonLink as string} isExternal={block.isExternal as boolean} style={block.style as 'light' | 'dark' | 'primary'} />

          case 'callout':
            return <CalloutBlockComponent key={key} variant={block.variant as 'info' | 'warning' | 'success' | 'danger'} title={block.title as string} content={block.content as Parameters<typeof CalloutBlockComponent>[0]['content']} />

          case 'pullquote':
            return <PullquoteBlockComponent key={key} text={block.text as string} attribution={block.attribution as string} />

          case 'divider':
            return <DividerBlockComponent key={key} style={block.style as 'default' | 'dot' | 'gradient'} />

          case 'faqBlock':
            return <FAQBlockComponent key={key} heading={block.heading as string} headingLevel={block.headingLevel as 'h2' | 'h3' | 'h4'} faqs={block.faqs as Parameters<typeof FAQBlockComponent>[0]['faqs']} />

          case 'stats':
            return <StatsBlockComponent key={key} items={block.items as Parameters<typeof StatsBlockComponent>[0]['items']} />

          case 'productGrid':
            return <ProductGridBlockComponent key={key} heading={block.heading as string} headingLevel={block.headingLevel as 'h2' | 'h3' | 'h4'} products={block.products as Parameters<typeof ProductGridBlockComponent>[0]['products']} columns={block.columns as '2' | '3' | '4'} />

          default:
            return null
        }
      })}
    </>
  )
}
