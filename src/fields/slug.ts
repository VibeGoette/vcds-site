import type { Field, TextField } from 'payload'

/**
 * Reusable slug field with auto-generation from title.
 * Usage: import { slugField } from '@/fields/slug'
 * Then add to collection fields array: slugField()
 */
export const slugField = (
  sourceField: string = 'title',
): TextField => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Wird automatisch aus "${sourceField}" generiert. Kann manuell ueberschrieben werden.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, data }: { value?: string; data?: Record<string, unknown> }) => {
        if (!value && data?.[sourceField]) {
          return slugify(data[sourceField] as string)
        }
        if (value) {
          return slugify(value)
        }
        return value
      },
    ],
  },
})

/**
 * German-friendly slugification.
 * Handles umlauts (ä→ae, ö→oe, ü→ue, ß→ss) and special chars.
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // German umlauts
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    // Remove accents from other chars
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace non-alphanumeric with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
}
