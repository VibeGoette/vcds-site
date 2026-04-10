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
 * The `CharCount` component below uses `className` with Tailwind color classes
 * (e.g. `text-green-600`, `text-red-600`) for the character-count indicator.
 * These class names are currently non-functional in the admin panel and should
 * be replaced with inline styles if the visual indicator is important. The
 * surrounding SERP mockup already uses inline styles for this reason.
 *
 * Therefore this component intentionally uses inline `style={{...}}` objects
 * for the majority of its styling. Do not convert to Tailwind classes without
 * first verifying that Tailwind CSS is actually loaded in the admin panel.
 */
'use client'

import { useFormFields } from '@payloadcms/ui'

function CharCount({ current, greenMax, yellowMax }: { current: number; greenMax: number; yellowMax: number }) {
  // Inline colors because the admin panel does not load Tailwind — see the
  // header comment. The previous version used text-green-600 / text-red-600
  // className strings which silently produced grey text in the admin.
  const color =
    current === 0 ? '#9ca3af' :       // gray-400
    current <= greenMax ? '#16a34a' : // green-600
    current <= yellowMax ? '#ca8a04' :// yellow-600
    '#dc2626'                         // red-600

  const label =
    current === 0 ? '' :
    current <= greenMax ? ' — OK' :
    current <= yellowMax ? ' — Grenzwertig' :
    ' — Zu lang'

  return (
    <span style={{ fontSize: '12px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color }}>
      {current}/{yellowMax}{label}
    </span>
  )
}

export default function SEOPreview() {
  const metaTitleField = useFormFields(([fields]) => fields['seo.metaTitle'])
  const metaDescriptionField = useFormFields(([fields]) => fields['seo.metaDescription'])

  const metaTitle = (metaTitleField?.value as string) || ''
  const metaDescription = (metaDescriptionField?.value as string) || ''

  const displayTitle = metaTitle || 'Kein Titel eingegeben'
  const displayDescription = metaDescription || 'Keine Beschreibung eingegeben'

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>
        Google-Vorschau
      </p>

      {/* SERP Mockup */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px 20px',
          maxWidth: '600px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* URL */}
        <div style={{ fontSize: '12px', color: '#4d5156', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#1a73e8', fontSize: '14px' }}>&#9679;</span>
          <span>vcds.de &rsaquo; ...</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '18px',
            color: metaTitle ? '#1a0dab' : '#999',
            lineHeight: '1.3',
            marginBottom: '4px',
            fontWeight: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayTitle}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '13px',
            color: metaDescription ? '#4d5156' : '#999',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {displayDescription}
        </div>
      </div>

      {/* Character counts */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '8px', fontSize: '12px' }}>
        <div>
          Titel: <CharCount current={metaTitle.length} greenMax={60} yellowMax={70} />
        </div>
        <div>
          Beschreibung: <CharCount current={metaDescription.length} greenMax={155} yellowMax={160} />
        </div>
      </div>
    </div>
  )
}
