import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/hooks/revalidate'

const hexColorValidate = (value: string | null | undefined): string | true => {
  if (!value) return true
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return true
  return 'Bitte einen gültigen Hex-Farbwert eingeben (z.B. #2563eb)'
}

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Design-Einstellungen',
  admin: {
    group: 'Einstellungen',
    description:
      'Farben, Schriftarten und Layout der Website anpassen. Änderungen werden sofort auf der Website sichtbar.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    // ── Farben ──
    {
      name: 'colors',
      type: 'group',
      label: 'Farben',
      admin: {
        description:
          'Hauptfarben der Website. Aus jeder Farbe werden automatisch helle und dunkle Abstufungen erzeugt.',
      },
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          label: 'Primärfarbe',
          defaultValue: '#2563eb',
          validate: hexColorValidate,
          admin: {
            description:
              'Hauptfarbe für Buttons, Links und Akzente. Standard: Blau (#2563eb). Format: #rrggbb',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          label: 'Akzentfarbe',
          defaultValue: '#dc2626',
          validate: hexColorValidate,
          admin: {
            description:
              'Zweite Farbe für Call-to-Action-Buttons und Hervorhebungen. Standard: Rot (#dc2626)',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          label: 'Textfarbe',
          defaultValue: '#0f172a',
          validate: hexColorValidate,
          admin: {
            description: 'Farbe für Fließtext und Überschriften. Standard: Dunkelblau (#0f172a)',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Hintergrundfarbe',
          defaultValue: '#ffffff',
          validate: hexColorValidate,
          admin: {
            description: 'Hintergrundfarbe der Website. Standard: Weiß (#ffffff)',
          },
        },
      ],
    },
    // Typografie: Quicksand ist die VCDS Corporate Font (fest, nicht aenderbar).
    // Schriftgroessen werden ueber Style-Einstellungen gesteuert.
    // ── Layout ──
    {
      name: 'layout',
      type: 'group',
      label: 'Layout',
      fields: [
        {
          name: 'buttonRadius',
          type: 'select',
          label: 'Button-Ecken',
          defaultValue: 'md',
          options: [
            { label: 'Eckig (keine Rundung)', value: 'none' },
            { label: 'Leicht gerundet', value: 'sm' },
            { label: 'Mittel gerundet (Standard)', value: 'md' },
            { label: 'Stark gerundet', value: 'lg' },
            { label: 'Voll gerundet (Pillenform)', value: 'full' },
          ],
          admin: {
            description: 'Wie rund sollen Button-Ecken sein?',
          },
        },
        {
          name: 'sectionSpacing',
          type: 'select',
          label: 'Abstand zwischen Bereichen',
          defaultValue: 'default',
          options: [
            { label: 'Kompakt (weniger Platz)', value: 'compact' },
            { label: 'Standard', value: 'default' },
            { label: 'Großzügig (mehr Platz)', value: 'spacious' },
          ],
          admin: {
            description: 'Vertikaler Abstand zwischen den Seitenbereichen.',
          },
        },
      ],
    },
  ],
}
