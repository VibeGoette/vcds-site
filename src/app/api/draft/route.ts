import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const secret = request.nextUrl.searchParams.get('secret')
  const collection = request.nextUrl.searchParams.get('collection')

  const draftSecret = process.env.DRAFT_SECRET || process.env.PAYLOAD_SECRET
  if (!draftSecret || secret !== draftSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  const path = collection === 'posts' ? `/blog/${slug}` : `/${slug}`
  redirect(path)
}
