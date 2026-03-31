import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seo'
import { publicReadMarketingWrite } from '@/access'
import { contentBlocks } from '@/blocks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog-Beitrag', plural: 'Blog-Beiträge' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'author'],
    group: 'Inhalt',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data?.slug}`,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Public: only published posts
      if (!user) return { status: { equals: 'published' } }
      // Logged in: all posts
      return true
    },
    create: publicReadMarketingWrite.create,
    update: publicReadMarketingWrite.update,
    delete: publicReadMarketingWrite.delete,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
      admin: {
        description: 'Blog-Titel. z.B. "VCDS Crack Download Deutsch" oder "HEX-V2 vs. HEX-NET – Die Qual der Wahl!"',
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description: 'Leer = wird beim Veröffentlichen automatisch gesetzt.',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.status === 'published') {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autor',
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ value, req }) => {
            if (!value && req.user) return req.user.id
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategorie',
      options: [
        { label: 'Beratung zu VCDS', value: 'beratung' },
        { label: 'VCDS Versionshistorie', value: 'versionshistorie' },
        { label: 'Mini-Beitrag', value: 'mini' },
        { label: 'Anleitungen & Tipps', value: 'anleitungen' },
        { label: 'News', value: 'news' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'json',
      label: 'Tags',
      admin: {
        position: 'sidebar',
        description: 'Komma-getrennte Tags als Array, z.B. ["HEX-V2", "Kaufberatung", "Codierung"]',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Beitragsbild',
      admin: {
        description: 'Wird in der Blog-Übersicht und als Social-Sharing-Bild angezeigt.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      maxLength: 300,
      admin: {
        description: 'Max. 300 Zeichen. Wird in der Blog-Übersicht und in Suchergebnissen angezeigt.',
      },
    },
    // ── Block-basierter Content ──
    {
      name: 'layout',
      type: 'blocks',
      label: 'Beitragsinhalt',
      blocks: contentBlocks,
    },
    // ── Fallback Rich-Text ──
    {
      name: 'content',
      type: 'richText',
      label: 'Einfacher Inhalt',
      admin: {
        condition: (data) => !data?.layout?.length,
      },
    },
    // ── Related Posts ──
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Verwandte Beiträge',
      admin: {
        description: 'Wird am Ende des Beitrags angezeigt. Max. 3 empfohlen.',
      },
      maxRows: 6,
    },
    seoFields,
  ],
}
