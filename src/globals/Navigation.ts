import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/hooks/revalidate'
import { validateUrl } from '@/fields/validateUrl'

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
          validate: validateUrl,
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
              validate: validateUrl,
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
          validate: validateUrl,
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
