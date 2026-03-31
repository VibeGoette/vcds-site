import type { CollectionConfig } from 'payload'
import { publicReadMarketingWrite } from '@/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Kundenstimme', plural: 'Kundenstimmen' },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'isActive', 'sortOrder'],
    group: 'Inhalt',
  },
  access: publicReadMarketingWrite,
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Zitat',
      admin: {
        description: 'Die Kundenbewertung im Original-Wortlaut. Tippfehler beibehalten (Authentizität).',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Name / Absender',
      admin: { description: 'z.B. "Verifizierter VCDS-Kunde", "Autohaus Nordost Berlin"' },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Firma (optional)',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Sternebewertung',
      min: 1,
      max: 5,
      admin: {
        position: 'sidebar',
        description: '1-5 Sterne. Optional.',
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Quelle',
      options: [
        { label: 'Google Reviews', value: 'google' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'E-Mail / Direkt', value: 'direct' },
        { label: 'Forum', value: 'forum' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktiv',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
