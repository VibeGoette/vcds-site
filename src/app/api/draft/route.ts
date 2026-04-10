import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const ALLOWED_COLLECTIONS = new Set(['pages', 'posts'])
// Slug: lowercase alphanumerics, hyphens, optional single-level slashes.
// Must not start with a slash (prevents protocol-relative open redirect like //evil.com).
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-/]*$/

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const secret = request.nextUrl.searchParams.get('secret')
  const collection = request.nextUrl.searchParams.get('collection')

  const draftSecret = process.env.DRAFT_SECRET || process.env.PAYLOAD_SECRET
  if (!draftSecret || secret !== draftSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!collection || !ALLOWED_COLLECTIONS.has(collection)) {
    return new Response('Invalid collection', { status: 400 })
  }
  if (!slug || !SLUG_PATTERN.test(slug) || slug.includes('//')) {
    return new Response('Invalid slug', { status: 400 })
  }

  const dm = await draftMode()
  dm.enable()

  const path = collection === 'posts' ? `/blog/${slug}` : `/${slug}`
  redirect(path)
}
