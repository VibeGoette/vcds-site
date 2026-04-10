/**
 * Slug utilities.
 *
 * Two variants exist intentionally:
 *
 *  - `slugify`: ASCII-safe slug used for URL paths and CMS slug fields.
 *    Transliterates German umlauts (ä→ae, ö→oe, ü→ue, ß→ss) so URLs are
 *    portable and do not rely on URL-encoding.
 *
 *  - `slugifyHeading`: Permissive slug used for in-page heading anchors
 *    (Markdown + Lexical headings). Preserves umlauts so existing TOC anchors
 *    like `#über-uns` keep working — changing these would silently break
 *    inbound deep-links to published posts.
 */

/** ASCII-safe slug for URLs. Transliterates German umlauts. */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Heading-anchor slug. Preserves German umlauts for backwards compatibility
 * with existing TOC links. Do NOT use for URL paths.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, '-')
    .replace(/^-|-$/g, '')
}
