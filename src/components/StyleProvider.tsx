import { getStyleSettings } from '@/lib/payload'

/**
 * Strip the most dangerous CSS constructs from an admin-authored CSS string.
 *
 * Approach: blocklist of known-dangerous patterns.
 *  - `<script>…</script>` blocks  — prevents JS injection if CSS lands in HTML
 *  - `</style>`                   — prevents breaking out of the enclosing <style> tag
 *  - `javascript:` URLs           — blocks CSS `url(javascript:…)` vectors
 *  - `expression(…)`              — blocks legacy IE CSS expressions that execute JS
 *  - `@import`                    — prevents loading external stylesheets
 *
 * What this does NOT block:
 *  - HTML entities (not a risk inside a <style> block)
 *  - Obfuscated URLs such as `url(data:…)` — acceptable for trusted admin use
 *  - Valid CSS custom properties, calc(), variables, etc.
 *
 * Security posture: defense-in-depth only. This CSS is exclusively editable by
 * the `super-philipp` role — a single trusted admin — so it is NOT designed to
 * sanitize arbitrary untrusted input. The blocklist exists to catch accidental
 * mistakes and provide a safety net; it is not a replacement for access control.
 */
export function sanitizeCss(css: string): string {
  return css
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<\/style>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/@import/gi, '')
}

export async function StyleProvider({ children, pageCss }: { children: React.ReactNode; pageCss?: string | null }) {
  const settings = await getStyleSettings()

  const h1Size = settings?.typography?.h1Size ?? 2.25
  const h2Size = settings?.typography?.h2Size ?? 1.875
  const h3Size = settings?.typography?.h3Size ?? 1.25
  const bodySize = settings?.typography?.bodySize ?? 1
  const lineHeight = settings?.typography?.lineHeight ?? 1.65

  const sectionPadding = settings?.spacing?.sectionPadding ?? 4
  const cardGap = settings?.spacing?.cardGap ?? 1.5
  const containerMaxWidth = settings?.spacing?.containerMaxWidth ?? 72

  // Only super-philipp can edit CSS — trusted admin input, sanitized as defense-in-depth
  const globalCss = settings?.customCss?.globalCss || ''

  const cssVars: Record<string, string> = {
    '--h1-size': `${h1Size}rem`,
    '--h2-size': `${h2Size}rem`,
    '--h3-size': `${h3Size}rem`,
    '--body-size': `${bodySize}rem`,
    '--line-height': String(lineHeight),
    '--style-section-padding': `${sectionPadding}rem`,
    '--style-card-gap': `${cardGap}rem`,
    '--style-container-max-width': `${containerMaxWidth}rem`,
  }

  return (
    <div style={cssVars as React.CSSProperties} className="flex flex-col flex-1">
      {/* Global custom CSS — only editable by super-philipp, sanitized as defense-in-depth */}
      {globalCss && <style dangerouslySetInnerHTML={{ __html: sanitizeCss(globalCss) }} />}
      {pageCss && <style dangerouslySetInnerHTML={{ __html: sanitizeCss(pageCss) }} />}
      {children}
    </div>
  )
}
