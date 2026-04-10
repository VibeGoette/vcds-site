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

// SEC-01: In production, a missing or weak PAYLOAD_SECRET is a hard error.
// In dev, a documented fallback is used so local setup works without env files.
function resolvePayloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET
  if (secret && secret.length >= 32) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'PAYLOAD_SECRET is required in production and must be at least 32 characters. ' +
      'Set it in your environment (e.g. Vercel project settings) before deploying.',
    )
  }
  console.warn(
    '[payload.config] PAYLOAD_SECRET not set — using insecure dev fallback. ' +
    'This value MUST NOT be used in production.',
  )
  return 'vcds-dev-secret-change-in-production-min-32-chars!!'
}

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

  secret: resolvePayloadSecret(),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
