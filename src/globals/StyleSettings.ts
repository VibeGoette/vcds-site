import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/hooks/revalidate'
import { superPhilippOnly } from '@/access'

export const StyleSettings: GlobalConfig = {
  slug: 'style-settings',
  label: 'Style-Einstellungen',
  admin: {
    group: 'Einstellungen',
    description:
      'Schriftgroessen, Abstaende und eigenes CSS anpassen. Aenderungen werden sofort auf der Website sichtbar.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    // ── Typografie ──
    {
      name: 'typography',
      type: 'group',
      label: 'Schriftgroessen',
      admin: {
        description: 'Groessen in rem (1rem = 16px). Mit den Pfeiltasten oder direkt eingeben.',
      },
      fields: [
        {
          name: 'h1Size',
          type: 'number',
          label: 'H1 (Seitentitel)',
          defaultValue: 2.25,
          min: 1.5,
          max: 4,
          admin: {
            step: 0.125,
            description: 'Standard: 2.25rem (36px)',
          },
        },
        {
          name: 'h2Size',
          type: 'number',
          label: 'H2 (Abschnitts-Titel)',
          defaultValue: 1.875,
          min: 1.25,
          max: 3,
          admin: {
            step: 0.125,
            description: 'Standard: 1.875rem (30px)',
          },
        },
        {
          name: 'h3Size',
          type: 'number',
          label: 'H3 (Unter-Titel)',
          defaultValue: 1.25,
          min: 1,
          max: 2.5,
          admin: {
            step: 0.125,
            description: 'Standard: 1.25rem (20px)',
          },
        },
        {
          name: 'bodySize',
          type: 'number',
          label: 'Fliesstext',
          defaultValue: 1,
          min: 0.8,
          max: 1.5,
          admin: {
            step: 0.0625,
            description: 'Standard: 1rem (16px)',
          },
        },
        {
          name: 'lineHeight',
          type: 'number',
          label: 'Zeilenhoehe',
          defaultValue: 1.65,
          min: 1.2,
          max: 2,
          admin: {
            step: 0.05,
            description: 'Standard: 1.65 (gut lesbar). Hoeher = mehr Luft zwischen Zeilen.',
          },
        },
      ],
    },
    // ── Abstaende ──
    {
      name: 'spacing',
      type: 'group',
      label: 'Abstaende',
      admin: {
        description: 'Vertikale Abstaende und Breiten in rem.',
      },
      fields: [
        {
          name: 'sectionPadding',
          type: 'number',
          label: 'Bereichs-Abstand (vertikal)',
          defaultValue: 4,
          min: 2,
          max: 8,
          admin: {
            step: 0.5,
            description: 'Abstand ueber und unter Seitenbereichen. Standard: 4rem (64px).',
          },
        },
        {
          name: 'cardGap',
          type: 'number',
          label: 'Karten-Abstand',
          defaultValue: 1.5,
          min: 0.5,
          max: 4,
          admin: {
            step: 0.25,
            description: 'Abstand zwischen Karten und Grid-Elementen. Standard: 1.5rem (24px).',
          },
        },
        {
          name: 'containerMaxWidth',
          type: 'number',
          label: 'Maximale Seitenbreite',
          defaultValue: 72,
          min: 60,
          max: 90,
          admin: {
            step: 2,
            description: 'Maximale Breite des Inhaltsbereichs. Standard: 72rem (1152px).',
          },
        },
      ],
    },
    // ── Erweitertes CSS (nur Super-Philipp) ──
    {
      name: 'customCss',
      type: 'group',
      label: 'Erweitertes CSS',
      admin: {
        description: 'Eigenes CSS einfuegen. Nur fuer erfahrene Nutzer — fehlerhaftes CSS kann die Website beschaedigen.',
        condition: (_data, _siblingData, { user }) => user?.role === 'super-philipp',
      },
      fields: [
        {
          name: 'globalCss',
          type: 'textarea',
          label: 'Globales CSS',
          access: {
            read: superPhilippOnly,
            update: superPhilippOnly,
          },
          admin: {
            description: 'CSS das auf ALLEN Seiten der Website eingefuegt wird. Beispiel: .my-class { color: red; }',
            rows: 12,
          },
        },
      ],
    },
  ],
}
