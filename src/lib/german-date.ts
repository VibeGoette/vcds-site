/**
 * Parse a German long-form date like "27. Oktober 2025" into ISO-8601
 * ("2025-10-27"). Used to feed the hardcoded blog posts' German `date`
 * strings into schema.org `datePublished`, which expects ISO format.
 * Falls back to the original string if parsing fails — schema.org is
 * lenient, Google will still try to interpret.
 */
export function parseGermanDate(germanDate: string): string {
  const months: Record<string, string> = {
    januar: '01', februar: '02', märz: '03', april: '04',
    mai: '05', juni: '06', juli: '07', august: '08',
    september: '09', oktober: '10', november: '11', dezember: '12',
  }
  const match = germanDate.match(/^(\d{1,2})\.\s*([a-zA-Zäöü]+)\s*(\d{4})$/i)
  if (!match) return germanDate
  const [, day, monthName, year] = match
  const month = months[monthName.toLowerCase()]
  if (!month) return germanDate
  return `${year}-${month}-${day.padStart(2, '0')}`
}
