import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

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

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/', 'layout')
  return doc
}
