/**
 * NOTE (CQ-09): The Payload admin panel does NOT load Tailwind CSS.
 *
 * The project's Tailwind styles are only injected via `src/app/(app)/layout.tsx`
 * (which imports `globals.css` with `@tailwind base/components/utilities`).
 * The admin route group at `src/app/(payload)/layout.tsx` only imports
 * `custom.scss` — a nearly-empty file with no Tailwind directives — and
 * `payload.config.ts` has no `admin.css` entry that would load Tailwind either.
 *
 * Tailwind's content scanner does process this file (tailwind.config.ts scans
 * `./src/**`), so class names are generated in the output CSS bundle — but that
 * bundle is never served to the admin panel. Using Tailwind classes here would
 * silently produce unstyled elements.
 *
 * Therefore this component intentionally uses inline `style={{...}}` objects.
 * Do not convert to Tailwind classes without first verifying that Tailwind CSS
 * is actually loaded in the admin panel.
 */
'use client'

import React, { useEffect, useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

interface UsageEntry {
  collection: string
  collectionLabel: string
  id: string
  title: string
}

const COLLECTION_CONFIG: Array<{
  slug: string
  label: string
  titleField: string
  mediaFields: string[]
}> = [
  { slug: 'posts', label: 'Blog-Beitrag', titleField: 'title', mediaFields: ['featuredImage'] },
  { slug: 'pages', label: 'Seite', titleField: 'title', mediaFields: ['heroImage'] },
  { slug: 'products', label: 'Produkt', titleField: 'name', mediaFields: ['featuredImage'] },
  { slug: 'team-members', label: 'Team-Mitglied', titleField: 'name', mediaFields: ['photo'] },
  { slug: 'dealers', label: 'Fachhaendler', titleField: 'name', mediaFields: ['logo'] },
  { slug: 'downloads', label: 'Download', titleField: 'title', mediaFields: ['downloadFile'] },
]

const MediaUsageField: React.FC = () => {
  const { id } = useDocumentInfo()
  const [usages, setUsages] = useState<UsageEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchUsages = async () => {
      setLoading(true)
      setError(null)
      const results: UsageEntry[] = []

      try {
        // Build all queries and run in parallel
        const queries = COLLECTION_CONFIG.flatMap((config) =>
          config.mediaFields.map((field) => ({
            config,
            url: `/api/${config.slug}?where[${field}][equals]=${id}&limit=100&depth=0`,
          })),
        )

        const responses = await Promise.all(
          queries.map(async ({ config, url }) => {
            try {
              const res = await fetch(url, { credentials: 'include' })
              if (!res.ok) return []
              const data = await res.json()
              if (!data.docs?.length) return []
              return data.docs.map((doc: Record<string, string>) => ({
                collection: config.slug,
                collectionLabel: config.label,
                id: doc.id,
                title: doc[config.titleField] || doc.id,
              }))
            } catch {
              return []
            }
          }),
        )

        for (const entries of responses) {
          results.push(...entries)
        }

        setUsages(results)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsages()
  }, [id])

  if (!id) return null

  return (
    <div
      style={{
        marginTop: '16px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
      }}
    >
      <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
        Verwendung
      </h4>

      {loading && <p style={{ color: '#6b7280', fontSize: '13px' }}>Wird geladen...</p>}

      {error && <p style={{ color: '#dc2626', fontSize: '13px' }}>Fehler: {error}</p>}

      {!loading && !error && usages.length === 0 && (
        <p style={{ color: '#9ca3af', fontSize: '13px' }}>
          Wird nirgends verwendet
        </p>
      )}

      {!loading && !error && usages.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {usages.map((usage, i) => (
            <li key={`${usage.collection}-${usage.id}-${i}`} style={{ marginBottom: '6px' }}>
              <a
                href={`/admin/collections/${usage.collection}/${usage.id}`}
                style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '13px' }}
              >
                {usage.collectionLabel} — {usage.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MediaUsageField
