import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Kontaktanfrage', plural: 'Kontaktanfragen' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'submittedAt'],
    group: 'System',
    description: 'Eingegangene Kontaktanfragen über das Website-Formular.',
  },
  // DSGVO: personenbezogene Daten nur für Admins sichtbar. Die öffentliche
  // /api/contact-Route schreibt mit overrideAccess über den Payload-Client,
  // daher bleibt `create: () => false` hier unverändert (kein öffentliches Schreiben über die REST API).
  access: {
    read: isAdmin,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-Mail',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'adapterNr',
      type: 'text',
      label: 'Adapter-Nr.',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Nachricht',
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      label: 'Eingegangen am',
      admin: {
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm' },
        readOnly: true,
      },
    },
  ],
}
