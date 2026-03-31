import type { GlobalConfig } from 'payload'

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
          admin: { description: 'Interner Pfad (/produkte) oder externe URL.' },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'Externer Link',
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
            },
            {
              name: 'isExternal',
              type: 'checkbox',
              label: 'Externer Link',
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
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
