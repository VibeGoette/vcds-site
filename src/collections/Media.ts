import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'

const copyFilenameToDisplayName: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' && data && !data.displayName && data.filename) {
    data.displayName = data.filename
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medium', plural: 'Medien' },
  admin: {
    group: 'Medien',
    useAsTitle: 'displayName',
    defaultColumns: ['filename', 'displayName', 'alt', 'tags', 'updatedAt'],
    listSearchableFields: ['alt', 'filename', 'displayName', 'caption'],
    description: 'Bilder hochladen: PNG, JPEG, WebP, SVG oder GIF. 5 Größen werden automatisch generiert: Thumbnail (300×200), Mobile (480×320), Card (800×533), Desktop (1200×800), Hero (1920px breit). Empfohlen: Original in 1200×800 oder größer hochladen.',
  },
  hooks: {
    beforeChange: [copyFilenameToDisplayName],
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
      name: 'displayName',
      type: 'text',
      label: 'Anzeigename',
      admin: {
        description: 'Name in der Mediathek. Leer = Dateiname wird verwendet.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt-Text (Bildbeschreibung)',
      validate: (value: unknown) => {
        const text = typeof value === 'string' ? value : ''
        if (!text) return true // required handles empty
        const genericTerms = ['bild', 'foto', 'screenshot', 'image', 'dekorativ']
        if (genericTerms.includes(text.trim().toLowerCase())) {
          return 'Bitte einen beschreibenden Alt-Text verwenden, nicht nur ein einzelnes Wort wie "Bild" oder "Foto".'
        }
        if (text.length < 10) {
          return 'Alt-Text sollte mindestens 10 Zeichen lang sein, damit er hilfreich ist.'
        }
        return true
      },
      admin: {
        description:
          'Pflicht für Barrierefreiheit und SEO. Beschreibt was auf dem Bild zu sehen ist. Beispiele: "VCDS HEX-V2 Diagnoseadapter mit USB-Kabel, Frontansicht", "Team-Meeting im Büro Bochum", "Screenshot der VCDS Software mit Fehlerspeicher-Ansicht". Rein dekorative Bilder: "Dekoratives Hintergrundbild" eintragen.',
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
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      label: 'Kategorien',
      admin: {
        description: 'Hilft beim Finden und Filtern von Bildern.',
      },
      options: [
        { label: 'Produkt', value: 'produkt' },
        { label: 'Team', value: 'team' },
        { label: 'Blog', value: 'blog' },
        { label: 'Screenshot', value: 'screenshot' },
        { label: 'Icon', value: 'icon' },
        { label: 'Sonstiges', value: 'sonstiges' },
      ],
    },
    {
      name: 'usage',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/MediaUsageField',
        },
      },
    },
  ],
}
