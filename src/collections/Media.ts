import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medium', plural: 'Medien' },
  admin: {
    group: 'Medien',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined, // auto height
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt-Text (Bildbeschreibung)',
      admin: {
        description:
          'Pflicht für Accessibility. Beschreibt was auf dem Bild zu sehen ist. Dekorative Bilder: "Dekorativ" eintragen.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift',
      admin: {
        description: 'Optional. Wird unter dem Bild angezeigt wenn eingebunden.',
      },
    },
  ],
}
