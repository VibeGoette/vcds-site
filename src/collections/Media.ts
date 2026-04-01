import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medium', plural: 'Medien' },
  admin: {
    group: 'Medien',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    description: 'Bilder hochladen: PNG, JPEG, WebP, SVG oder GIF. 5 Größen werden automatisch generiert: Thumbnail (300×200), Mobile (480×320), Card (800×533), Desktop (1200×800), Hero (1920px breit). Empfohlen: Original in 1200×800 oder größer hochladen.',
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
        name: 'mobile',
        width: 480,
        height: 320,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 533,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1200,
        height: 800,
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
