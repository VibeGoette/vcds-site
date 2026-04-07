import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seo'
import { publicReadAdminWrite } from '@/access'
import { contentBlocks } from '@/blocks'
import { revalidateCollection } from '@/hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Inhalt',
    livePreview: {
      url: ({ data }) => `/api/draft?secret=${process.env.PAYLOAD_SECRET}&slug=${data?.slug}&collection=pages`,
    },
  },
  access: publicReadAdminWrite,
  hooks: {
    afterChange: [revalidateCollection],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Seitentitel',
      admin: {
        description: 'z.B. "Über VCDS", "Produktübersicht", "FAQ"',
      },
    },
    slugField('title'),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Entwurf', value: 'draft' },
        { label: 'Veröffentlicht', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero-Bild',
      admin: {
        description: 'Optionales Titelbild für die Seite.',
      },
    },
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero-Überschrift',
      admin: {
        description: 'Überschreibt den Seitentitel im Hero-Bereich. Leer = Seitentitel wird verwendet.',
      },
    },
    {
      name: 'heroSubtext',
      type: 'textarea',
      label: 'Hero-Untertext',
    },
    {
      name: 'showBreadcrumb',
      type: 'checkbox',
      label: 'Breadcrumb anzeigen',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    // ── Block-basierter Content ──
    {
      name: 'layout',
      type: 'blocks',
      label: 'Seiteninhalt',
      blocks: contentBlocks,
      admin: {
        description: 'Bausteine für den Seiteninhalt. Per Drag & Drop sortieren.',
      },
    },
    // ── Fallback: einfacher Rich-Text ──
    {
      name: 'content',
      type: 'richText',
      label: 'Einfacher Inhalt',
      admin: {
        description: 'Alternative zu Blocks — einfacher Rich-Text-Editor. Wird UNTER den Blocks gerendert.',
        condition: (data) => !data?.layout?.length,
      },
    },
    // ── SEO ──
    seoFields,
    // ── Template-Auswahl ──
    {
      name: 'template',
      type: 'select',
      label: 'Seiten-Template',
      defaultValue: 'default',
      options: [
        { label: 'Standard', value: 'default' },
        { label: 'Startseite (Hero + Sections)', value: 'homepage' },
        { label: 'Info-Seite (schmal, text-zentriert)', value: 'info' },
        { label: 'Landing Page (Fullwidth)', value: 'landing' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
