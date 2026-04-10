'use client'

import { useFormFields } from '@payloadcms/ui'

function CharCount({ current, greenMax, yellowMax }: { current: number; greenMax: number; yellowMax: number }) {
  const color =
    current === 0 ? 'text-gray-400' :
    current <= greenMax ? 'text-green-600' :
    current <= yellowMax ? 'text-yellow-600' :
    'text-red-600'

  const label =
    current === 0 ? '' :
    current <= greenMax ? ' — OK' :
    current <= yellowMax ? ' — Zu lang' :
    ' — Zu lang'

  return (
    <span className={`text-xs font-mono ${color}`}>
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
