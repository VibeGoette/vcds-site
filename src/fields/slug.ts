import type { TextField } from 'payload'
import { slugify } from '@/lib/slug'

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
