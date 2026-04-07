import type { Field } from 'payload'

/**
 * Reusable SEO field group for meta title, description, and OG image.
 * Usage: import { seoFields } from '@/fields/seo'
 * Then add to collection fields array: seoFields
 */
export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO & Meta',
  admin: {
    description: 'Suchmaschinenoptimierung. Leer lassen = automatisch aus Titel/Inhalt generiert.',
  },
  fields: [
    {
      name: 'seoPreview',
      type: 'ui',
      label: 'Google-Vorschau',
      admin: {
        components: {
          Field: '/components/admin/SEOPreview',
        },
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Google-Suchtitel',
      maxLength: 70,
      admin: {
        description: 'Max. 70 Zeichen. Wird im Browser-Tab und in Google angezeigt.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Google-Beschreibung',
      maxLength: 160,
      admin: {
        description: 'Max. 160 Zeichen. Wird in Google-Suchergebnissen angezeigt.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      label: 'Social Sharing Bild',
      relationTo: 'media',
      admin: {
        description: 'Wird beim Teilen auf Social Media angezeigt. Ideal: 1200×630px.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Von Suchmaschinen ausschließen',
      defaultValue: false,
      admin: {
        description: 'Aktivieren = Seite wird nicht in Google indexiert.',
      },
    },
  ],
}
