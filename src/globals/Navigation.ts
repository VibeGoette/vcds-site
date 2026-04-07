import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/hooks/revalidate'

const validateHref = (value: string | null | undefined): string | true => {
  if (!value) return true
  if (value.startsWith('/') || value.startsWith('https://') || value.startsWith('http://')) return true
  return "Link muss mit '/' (intern) oder 'https://' (extern) beginnen."
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Einstellungen',
    description: 'Hauptnavigation und Footer-Navigation der Website.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      label: 'Hauptnavigation',
      admin: {
        description: 'Menüpunkte der Hauptnavigation. Untermenüs werden als Dropdown dargestellt.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menüpunkt',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Link',
          validate: validateHref,
          admin: { description: 'Interner Pfad (/produkte) oder externe URL.' },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'In neuem Tab öffnen',
          defaultValue: false,
        },
        {
          name: 'children',
          type: 'array',
          label: 'Untermenü',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Menüpunkt',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Link',
              validate: validateHref,
            },
            {
              name: 'isExternal',
              type: 'checkbox',
              label: 'In neuem Tab öffnen',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'footerNav',
      type: 'array',
      label: 'Footer-Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          validate: validateHref,
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'In neuem Tab öffnen',
          defaultValue: false,
        },
      ],
    },
  ],
}
