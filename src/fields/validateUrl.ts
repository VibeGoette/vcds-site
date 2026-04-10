/**
 * Payload field validator for URL and path inputs.
 * Accepts:
 *   - Absolute URLs starting with http:// or https://
 *   - Root-relative paths starting with /
 *   - Empty values when `required` is false (Payload handles required separately)
 * Use this for any CMS field that should accept either an external URL or an
 * internal site path (navigation items, CTA button links, dealer shop links,
 * download mirror URLs, etc.).
 */
export const validateUrl = (value: string | null | undefined): true | string => {
  if (!value) return true
  if (/^https?:\/\//i.test(value) || value.startsWith('/')) return true
  return 'Bitte eine gültige URL (https://...) oder einen relativen Pfad (/...) angeben.'
}
