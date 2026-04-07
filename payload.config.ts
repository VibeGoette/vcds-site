import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Products } from '@/collections/Products'
import { Dealers } from '@/collections/Dealers'
import { FAQs } from '@/collections/FAQs'
import { Downloads } from '@/collections/Downloads'
import { TeamMembers } from '@/collections/TeamMembers'
import { Testimonials } from '@/collections/Testimonials'
import { ContactSubmissions } from '@/collections/ContactSubmissions'

// Globals
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from '@/globals/Navigation'
import { ThemeSettings } from '@/globals/ThemeSettings'
import { StyleSettings } from '@/globals/StyleSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — VCDS.de Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
    components: {
      views: {
        bulkUpload: {
          Component: '/components/admin/BulkUploadView',
          path: '/bulk-upload',
        },
      },
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Products,
    Dealers,
    FAQs,
    Downloads,
    TeamMembers,
    Testimonials,
    ContactSubmissions,
  ],

  globals: [
    SiteSettings,
    Navigation,
    ThemeSettings,
    StyleSettings,
  ],

  editor: lexicalEditor(),

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./database.db',
    },
  }),

  secret: process.env.PAYLOAD_SECRET || 'vcds-dev-secret-change-in-production-min-32-chars!!',

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
