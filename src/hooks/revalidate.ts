import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * Payload `afterChange` hook that invalidates the Next.js cache whenever a
 * collection document is created or updated.
 *
 * Only published documents (or collections without a draft/_status field)
 * trigger revalidation — saving a draft does NOT bust the public cache.
 *
 * Path mapping per collection:
 *  - posts    → /blog/[slug]  (the post detail page) + /blog  (listing page)
 *  - pages    → /[slug]       (the CMS-driven page for that slug)
 *  - products → /produkte     (the products overview page)
 *  - faqs     → /faq          (the FAQ accordion page)
 *  - default  → /             (layout-level revalidation for any other collection,
 *                              e.g. Dealers, Downloads, Testimonials)
 */
export const revalidateCollection: CollectionAfterChangeHook = ({
  doc,
  collection,
}) => {
  if (doc._status === 'published' || !('_status' in doc)) {
    const slug = doc.slug
    switch (collection.slug) {
      case 'posts':
        revalidatePath(`/blog/${slug}`)
        revalidatePath('/blog')
        break
      case 'pages':
        revalidatePath(`/${slug}`)
        break
      case 'products':
        revalidatePath('/produkte')
        break
      case 'faqs':
        revalidatePath('/faq')
        break
      default:
        revalidatePath('/')
    }
  }
  return doc
}

/**
 * Payload `afterChange` hook for Globals (SiteSettings, Navigation, ThemeSettings).
 *
 * Globals affect the shared layout (header, footer, theme colours, fonts), so
 * we revalidate the root layout path which cascades to every page rendered
 * under that layout.
 */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/', 'layout')
  return doc
}
