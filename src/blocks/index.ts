import type { Block } from 'payload'

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
      admin: { description: 'Interner Pfad (/produkte) oder externe URL (https://...)' },
    },
    {
      name: 'buttonVariant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primär (blau)', value: 'primary' },
        { label: 'Sekundär (Outline)', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Warnung (rot)', value: 'danger' },
      ],
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

// ── Export all blocks for use in payload.config.ts ──
export const contentBlocks: Block[] = [
  RichTextBlock,
  ImageBlock,
  YouTubeBlock,
  CTABlock,
  ProductGridBlock,
  FAQBlock,
  TestimonialBlock,
  StatsBlock,
  TeamBlock,
]
