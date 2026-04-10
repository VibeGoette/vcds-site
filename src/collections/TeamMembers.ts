import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '@/access'
import { validateStringArray } from '@/fields/validateStringArray'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team-Mitglied', plural: 'Team-Mitglieder' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'sortOrder'],
    group: 'Inhalt',
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Position / Rolle',
      admin: { description: 'z.B. "VCDS Support", "VCDS Support · KFZ-Meister"' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
      admin: { description: 'Portraitfoto. Wird als runder Avatar dargestellt (120×120px).' },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biografie',
      admin: {
        description: 'Kurzbeschreibung der Person und ihrer Expertise. 2-3 Sätze.',
      },
    },
    {
      name: 'motto',
      type: 'text',
      label: 'Motto / Zitat',
      admin: {
        description: 'Persönliches Motto in Anführungszeichen, z.B. „Man kann nicht alles aus dem 255 wissen!"',
      },
    },
    {
      name: 'specialties',
      type: 'json',
      label: 'Spezialgebiete',
      validate: validateStringArray,
      admin: {
        description: 'Array von Spezialgebieten, z.B. ["Codierungen", "Retrofit", "Oszilloskop"]',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktiv (auf Website anzeigen)',
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
