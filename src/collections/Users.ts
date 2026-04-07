import type { CollectionConfig } from 'payload'
import { adminFieldAccess } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Benutzer', plural: 'Benutzer' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'name'],
    group: 'System',
  },
  access: {
    // Users can read their own profile, admins can read all
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super-Philipp (Vollzugriff + CSS)', value: 'super-philipp' },
        { label: 'Admin (Vollzugriff)', value: 'admin' },
        { label: 'Marketing (Posts, FAQ, SEO, Keywords)', value: 'marketing' },
        { label: 'Editor (Seiten & Produkte)', value: 'editor' },
      ],
      access: {
        // Only admins can change roles
        update: adminFieldAccess,
      },
      admin: {
        position: 'sidebar',
        description: 'Bestimmt welche Bereiche dieser Benutzer bearbeiten darf.',
      },
    },
  ],
}
