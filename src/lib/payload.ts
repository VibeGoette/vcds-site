import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

/** Fetch all published pages */
export async function getPages() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 100,
  })
  return docs
}

/** Fetch a single page by slug */
export async function getPageBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft,
  })
  return docs[0] || null
}

/** Fetch all published blog posts */
export async function getPosts() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
  })
  return docs
}

/** Fetch a single post by slug (depth:2 for populated relationships) */
export async function getPostBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
  })
  return docs[0] || null
}

/** Fetch all active products sorted by sortOrder (depth:2 for images) */
export async function getProducts() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    limit: 50,
    depth: 2,
  })
  return docs
}

/** Fetch all active dealers sorted by sortOrder */
export async function getDealers() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'dealers',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    limit: 50,
  })
  return docs
}

/** Fetch all published FAQs grouped by category */
export async function getFAQs() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'faqs',
    where: { status: { equals: 'published' } },
    sort: 'sortOrder',
    limit: 200,
  })
  return docs
}

/** Fetch all active downloads */
export async function getDownloads() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'downloads',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    limit: 50,
  })
  return docs
}

/** Fetch active team members */
export async function getTeamMembers() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team-members',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    limit: 10,
  })
  return docs
}

/** Fetch active testimonials */
export async function getTestimonials() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    limit: 10,
  })
  return docs
}

/** Fetch site settings global */
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

/** Fetch navigation global */
export async function getNavigation() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation' })
}

/** Fetch style settings global */
export async function getStyleSettings() {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'style-settings' })
  } catch {
    return null
  }
}

/** Fetch theme settings global */
export async function getThemeSettings() {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'theme-settings' })
  } catch {
    // Return null if theme-settings global doesn't exist yet (first run)
    return null
  }
}
