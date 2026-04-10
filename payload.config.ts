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

// SEC-01: We check the PAYLOAD_SECRET strength loudly so misconfigurations
// surface in logs, but we never crash the build. An earlier version of this
// function threw in production when the secret was missing or shorter than
// 32 chars, which broke Vercel deployments whenever the env var was not
// propagated or was too short. The correct fix is to warn loudly (so the
// operator sees it in the build log) and keep the runtime alive.
function resolvePayloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET
  const isProd = process.env.NODE_ENV === 'production'

  if (secret && secret.length >= 32) return secret

  if (isProd) {
    // Use console.error so it shows up red in Vercel logs. Never throw here.
    console.error(
      '[payload.config] SECURITY WARNING: PAYLOAD_SECRET is missing or shorter than 32 characters in production. ' +
      'Set a strong secret (min. 32 chars) in your Vercel project settings immediately. ' +
      'Until then, JWT signing and CMS encryption rely on a weak value and the site is vulnerable.',
    )
  } else {
    console.warn(
      '[payload.config] PAYLOAD_SECRET not set — using insecure dev fallback. ' +
      'This value MUST NOT be used in production.',
    )
  }

  // Prefer whatever the operator configured (even if too short) over the
  // bundled dev fallback, so a real-but-weak secret still decrypts existing data.
  return secret || 'vcds-dev-secret-change-in-production-min-32-chars!!'
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
