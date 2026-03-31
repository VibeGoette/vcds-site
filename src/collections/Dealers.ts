import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '@/access'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  labels: { singular: 'Fachhändler', plural: 'Fachhändler' },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'country', 'city', 'sortOrder'],
    group: 'Inhalt',
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Firmenname',
    },
    {
      name: 'country',
      type: 'select',
      required: true,
      label: 'Land',
      options: [
        { label: '🇩🇪 Deutschland', value: 'DE' },
        { label: '🇦🇹 Österreich', value: 'AT' },
        { label: '🇨🇭 Schweiz', value: 'CH' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'street',
      type: 'text',
      label: 'Straße + Hausnummer',
    },
    {
      name: 'zipCode',
      type: 'text',
      label: 'PLZ',
    },
    {
      name: 'city',
      type: 'text',
      label: 'Ort',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonnummer',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-Mail',
    },
    {
      name: 'shopUrl',
      type: 'text',
      required: true,
      label: 'Shop-URL',
      admin: {
        description: 'Link zum Online-Shop des Händlers.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Händler-Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      admin: {
        description: 'Optionaler Kurztext über den Händler.',
      },
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
      label: 'Sortierung',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
