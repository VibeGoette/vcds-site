import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Kontaktanfrage', plural: 'Kontaktanfragen' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'submittedAt'],
    group: 'System',
    description: 'Eingegangene Kontaktanfragen über das Website-Formular.',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => !!user,
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
