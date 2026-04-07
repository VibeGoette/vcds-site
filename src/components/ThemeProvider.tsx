import { getThemeSettings } from '@/lib/payload'
import { generatePalette } from '@/lib/color-utils'

const RADIUS_MAP: Record<string, string> = {
  none: '0px',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
}

const SPACING_MAP: Record<string, { sectionY: string; sectionYLg: string }> = {
  compact: { sectionY: '2.5rem', sectionYLg: '3.5rem' },
  default: { sectionY: '4rem', sectionYLg: '5rem' },
  spacious: { sectionY: '5.5rem', sectionYLg: '7rem' },
}

const FONT_MAP: Record<string, string> = {
  inter: 'var(--font-inter)',
  'dm-sans': 'var(--font-dm-sans)',
  'source-sans-3': 'var(--font-source-sans-3)',
  quicksand: 'var(--font-quicksand)',
}

export async function ThemeProvider({ children }: { children: React.ReactNode }) {
  const settings = await getThemeSettings()

  const primaryColor = settings?.colors?.primaryColor || '#2563eb'
  const accentColor = settings?.colors?.accentColor || '#dc2626'
  const textColor = settings?.colors?.textColor || '#0f172a'
  const backgroundColor = settings?.colors?.backgroundColor || '#ffffff'

  const headingFont = settings?.typography?.headingFont || 'inter'
  const bodyFont = settings?.typography?.bodyFont || 'inter'
  const buttonRadius = settings?.layout?.buttonRadius || 'md'
  const sectionSpacing = settings?.layout?.sectionSpacing || 'default'

  const primaryPalette = generatePalette(primaryColor)
  const accentPalette = generatePalette(accentColor)
  const spacing = SPACING_MAP[sectionSpacing] || SPACING_MAP.default

  const cssVars: Record<string, string> = {
    // Primary color palette
    '--color-primary': primaryColor,
    ...Object.fromEntries(
      Object.entries(primaryPalette).map(([shade, hex]) => [`--color-primary-${shade}`, hex]),
    ),

    // Accent color palette
    '--color-accent': accentColor,
    ...Object.fromEntries(
      Object.entries(accentPalette).map(([shade, hex]) => [`--color-accent-${shade}`, hex]),
    ),

    // Text & background
    '--color-text': textColor,
    '--color-bg': backgroundColor,

    // Typography
    '--font-heading': `${FONT_MAP[headingFont] || FONT_MAP.inter}, system-ui, sans-serif`,
    '--font-body': `${FONT_MAP[bodyFont] || FONT_MAP.inter}, system-ui, sans-serif`,

    // Layout
    '--button-radius': RADIUS_MAP[buttonRadius] || RADIUS_MAP.md,
    '--section-y': spacing.sectionY,
    '--section-y-lg': spacing.sectionYLg,
  }

  return (
    <div style={cssVars as React.CSSProperties}>
      {children}
    </div>
  )
}
