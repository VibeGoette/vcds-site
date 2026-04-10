import type { Block } from 'payload'
import { validateUrl } from '@/fields/validateUrl'

/**
 * Rich Text Block — Standard content with headings, lists, links
 */
export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Text', plural: 'Texte' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhalt',
    },
  ],
}

/**
 * Image Block — Single image with caption and alt
 */
export const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Bild', plural: 'Bilder' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
      admin: { description: 'Optional. Wird unter dem Bild angezeigt.' },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Bildgröße',
      defaultValue: 'full',
      options: [
        { label: 'Vollbreite', value: 'full' },
        { label: 'Mittel (720px)', value: 'medium' },
        { label: 'Klein (480px)', value: 'small' },
      ],
    },
  ],
}

/**
 * YouTube Block — Privacy-mode embed (youtube-nocookie.com)
 */
export const YouTubeBlock: Block = {
  slug: 'youtube',
  labels: { singular: 'YouTube Video', plural: 'YouTube Videos' },
  fields: [
    {
      name: 'videoId',
      type: 'text',
      required: true,
      label: 'YouTube Video-ID',
      admin: {
        description: 'Nur die ID, z.B. "dQw4w9WgXcQ" — nicht die volle URL.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video-Titel (für Accessibility)',
      admin: {
        description: 'Wird als aria-label für den iframe verwendet.',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
      ],
    },
  ],
}

/**
 * CTA Block — Call-to-Action banner with heading, text, and button
 */
export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call-to-Action', plural: 'Call-to-Actions' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift',
    },
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading-Ebene',
      defaultValue: 'h3',
      options: [
        { label: 'H2 (grosse Abschnittsueberschrift)', value: 'h2' },
        { label: 'H3 (Standard)', value: 'h3' },
        { label: 'H4 (Unterabschnitt)', value: 'h4' },
      ],
      admin: { description: 'Wie wichtig ist diese Ueberschrift im Seiten-Outline? Standard ist H3.' },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      label: 'Button-Text',
      defaultValue: 'Jetzt kaufen!',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      label: 'Button-Link',
      validate: validateUrl,
      admin: { description: 'Interner Pfad (/produkte) oder externe URL (https://...)' },
    },
    {
      // DEPRECATED (CQ-05): the React renderer no longer reads this field.
      // Kept in the schema so existing CMS rows don't lose data on save, but
      // `hidden: true` stops new content from using it. Delete in a future
      // release together with a data migration and a regenerate of payload-types.
      name: 'buttonVariant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primär (blau)', value: 'primary' },
        { label: 'Sekundär (Outline)', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Warnung (rot)', value: 'danger' },
      ],
      admin: {
        description: 'VERALTET: wird nicht mehr gerendert. Wird in einem späteren Release entfernt.',
        hidden: true,
      },
    },
    {
      name: 'isExternal',
      type: 'checkbox',
      label: 'Externer Link (öffnet neuen Tab)',
      defaultValue: false,
    },
    {
      name: 'style',
      type: 'select',
      label: 'Hintergrund-Stil',
      defaultValue: 'light',
      options: [
        { label: 'Hell', value: 'light' },
        { label: 'Dunkel', value: 'dark' },
        { label: 'Primär (blau)', value: 'primary' },
      ],
    },
  ],
}

/**
 * Product Grid Block — Displays product category cards
 */
export const ProductGridBlock: Block = {
  slug: 'productGrid',
  labels: { singular: 'Produkt-Grid', plural: 'Produkt-Grids' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading-Ebene',
      defaultValue: 'h3',
      options: [
        { label: 'H2 (grosse Abschnittsueberschrift)', value: 'h2' },
        { label: 'H3 (Standard)', value: 'h3' },
        { label: 'H4 (Unterabschnitt)', value: 'h4' },
      ],
      admin: { description: 'Wie wichtig ist diese Ueberschrift im Seiten-Outline? Standard ist H3.' },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Produkte',
      admin: {
        description: 'Produkte auswählen die im Grid angezeigt werden sollen.',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Spalten', value: '2' },
        { label: '3 Spalten', value: '3' },
        { label: '4 Spalten', value: '4' },
      ],
    },
  ],
}

/**
 * FAQ Block — Renders related FAQ items as accordion
 */
export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: { singular: 'FAQ-Bereich', plural: 'FAQ-Bereiche' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Häufig gestellte Fragen',
    },
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading-Ebene',
      defaultValue: 'h3',
      options: [
        { label: 'H2 (grosse Abschnittsueberschrift)', value: 'h2' },
        { label: 'H3 (Standard)', value: 'h3' },
        { label: 'H4 (Unterabschnitt)', value: 'h4' },
      ],
      admin: { description: 'Wie wichtig ist diese Ueberschrift im Seiten-Outline? Standard ist H3.' },
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'FAQ-Einträge',
      admin: {
        description: 'FAQ-Fragen auswählen die hier angezeigt werden sollen.',
      },
    },
  ],
}

/**
 * Testimonial Block — Customer quotes
 */
export const TestimonialBlock: Block = {
  slug: 'testimonialBlock',
  labels: { singular: 'Kundenstimmen', plural: 'Kundenstimmen' },
  fields: [
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Testimonials',
    },
  ],
}

/**
 * Stats Counter Block — Animated number counters
 */
export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Kennzahlen', plural: 'Kennzahlen' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Kennzahlen',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Wert',
          admin: { description: 'z.B. "1000+", "15", "32.445"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Beschriftung',
          admin: { description: 'z.B. "Zufriedene Kunden", "Jahre Erfahrung"' },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: { description: 'Optional: "+", "€", "%" etc.' },
        },
      ],
    },
  ],
}

/**
 * Team Block — Displays team member cards
 */
export const TeamBlock: Block = {
  slug: 'teamBlock',
  labels: { singular: 'Team-Bereich', plural: 'Team-Bereiche' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Unser Team',
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      label: 'Team-Mitglieder',
    },
  ],
}

/**
 * Callout Block — Info/Warning/Success/Danger boxes
 */
export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Hinweis-Box', plural: 'Hinweis-Boxen' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'info',
      label: 'Variante',
      options: [
        { label: 'Info (blau)', value: 'info' },
        { label: 'Warnung (gelb)', value: 'warning' },
        { label: 'Erfolg (grün)', value: 'success' },
        { label: 'Gefahr (rot)', value: 'danger' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      admin: { description: 'Optional. Wird fett über dem Inhalt angezeigt.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhalt',
    },
  ],
}

/**
 * Pullquote Block — Highlighted quote with attribution
 */
export const PullquoteBlock: Block = {
  slug: 'pullquote',
  labels: { singular: 'Zitat', plural: 'Zitate' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Zitat-Text',
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Quelle / Autor',
      admin: { description: 'Optional. Z.B. "Ross-Tech" oder "VCDS Forum"' },
    },
  ],
}

/**
 * Divider Block — Visual separator between content sections
 */
export const DividerBlock: Block = {
  slug: 'divider',
  labels: { singular: 'Trenner', plural: 'Trenner' },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      label: 'Stil',
      options: [
        { label: 'Standard (Gradient + Punkt)', value: 'default' },
        { label: 'Drei Punkte', value: 'dot' },
        { label: 'Gradient-Linie', value: 'gradient' },
      ],
    },
  ],
}

/**
 * Step Guide Block — Step-by-step instructions with optional screenshots
 * Ideal for Quickstart, AHK-Anleitungen, Troubleshooting guides
 */
export const StepGuideBlock: Block = {
  slug: 'stepGuide',
  labels: { singular: 'Schritt-für-Schritt Anleitung', plural: 'Schritt-für-Schritt Anleitungen' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      admin: { description: 'Optional. Z.B. "So installieren Sie VCDS"' },
    },
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading-Ebene',
      defaultValue: 'h3',
      options: [
        { label: 'H2 (grosse Abschnittsueberschrift)', value: 'h2' },
        { label: 'H3 (Standard)', value: 'h3' },
        { label: 'H4 (Unterabschnitt)', value: 'h4' },
      ],
      admin: { description: 'Wie wichtig ist diese Ueberschrift im Seiten-Outline? Standard ist H3.' },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Schritte',
      minRows: 1,
      maxRows: 30,
      admin: {
        description: 'Einzelne Schritte der Anleitung. Jeder Schritt kann einen Screenshot enthalten.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Schritt-Titel',
          admin: { description: 'Z.B. "VCDS herunterladen", "Interface anschließen"' },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Beschreibung',
          admin: { description: 'Detaillierte Anleitung für diesen Schritt.' },
        },
        {
          name: 'screenshot',
          type: 'upload',
          relationTo: 'media',
          label: 'Screenshot / Bild',
          admin: { description: 'Optional. Screenshot oder Foto für diesen Schritt.' },
        },
        {
          name: 'screenshotCaption',
          type: 'text',
          label: 'Bildunterschrift',
          admin: { description: 'Optional. Wird unter dem Screenshot angezeigt.' },
        },
        {
          name: 'hint',
          type: 'text',
          label: 'Hinweis / Tipp',
          admin: { description: 'Optional. Kurzer Hinweis unter der Beschreibung (z.B. "Tipp: Als Administrator ausführen").' },
        },
      ],
    },
  ],
}

/**
 * Screenshot Block — Annotated screenshot with optional numbered markers
 * Useful for UI walkthroughs and visual guides
 */
export const ScreenshotBlock: Block = {
  slug: 'screenshot',
  labels: { singular: 'Screenshot (annotiert)', plural: 'Screenshots (annotiert)' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Screenshot',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt-Text',
      admin: { description: 'Beschreibung für Screenreader und SEO.' },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Bildgröße',
      defaultValue: 'full',
      options: [
        { label: 'Vollbreite', value: 'full' },
        { label: 'Mittel (720px)', value: 'medium' },
        { label: 'Klein (480px)', value: 'small' },
      ],
    },
    {
      name: 'border',
      type: 'checkbox',
      label: 'Rahmen anzeigen',
      defaultValue: true,
      admin: { description: 'Dünner Rahmen um den Screenshot für bessere Abgrenzung.' },
    },
  ],
}

// ── Export all blocks for use in payload.config.ts ──
export const contentBlocks: Block[] = [
  RichTextBlock,
  ImageBlock,
  YouTubeBlock,
  CTABlock,
  CalloutBlock,
  PullquoteBlock,
  DividerBlock,
  ProductGridBlock,
  FAQBlock,
  TestimonialBlock,
  StatsBlock,
  TeamBlock,
  StepGuideBlock,
  ScreenshotBlock,
]
