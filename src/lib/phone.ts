/**
 * Normalise a German phone number for use as a `tel:` URI.
 *
 * German numbers are often written with the trunk prefix in parentheses,
 * e.g. "+49 (0) 234 58 545 800". In international E.164 form the `0` must be
 * dropped entirely — stripping just the parens would leave "+490234..." which
 * most dialers tolerate but is technically invalid. We remove the `(0)` as a
 * group first, then strip remaining whitespace and grouping characters.
 *
 * Usage:
 *   <a href={`tel:${stripTel(phone)}`}>{phone}</a>
 */
export function stripTel(phone: string): string {
  return phone.replace(/\(0\)/g, '').replace(/[\s()\-/]/g, '')
}
