import type { CollectionConfig } from 'payload'
import { publicReadMarketingWrite } from '@/access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'sortOrder'],
    group: 'Inhalt',
    listSearchableFields: ['question', 'category'],
  },
  access: publicReadMarketingWrite,
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Frage',
      admin: {
        description: 'Die FAQ-Frage, z.B. "Für welche Fahrzeugmarken ist VCDS geeignet?"',
      },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      label: 'Antwort',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'FAQ-Bereich',
      options: [
        { label: 'Teil 1 — Allgemein', value: 'teil-1-allgemein' },
        { label: 'Teil 2 — Kompatibilität & Funktionen', value: 'teil-2-kompatibilitaet' },
        { label: 'Teil 3 — Registrierung & Support', value: 'teil-3-registrierung' },
        { label: 'Teil 4 — Nutzung & Troubleshooting', value: 'teil-4-nutzung' },
        { label: 'Teil 5 — HEX-NET spezifisch', value: 'teil-5-hexnet' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sortierung innerhalb der Kategorie',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Reihenfolge innerhalb des FAQ-Teils. Niedrig = oben.',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Veröffentlicht',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
