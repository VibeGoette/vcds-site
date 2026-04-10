import type { CollectionConfig } from 'payload'
import { adminFieldAccess, hasAdminRole } from '@/access'

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
    read: ({ req: { user } }) => {
      if (hasAdminRole(user?.role)) return true
      return { id: { equals: user?.id } }
    },
    create: ({ req: { user } }) => hasAdminRole(user?.role),
    update: ({ req: { user } }) => {
      if (hasAdminRole(user?.role)) return true
      return { id: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => hasAdminRole(user?.role),
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
