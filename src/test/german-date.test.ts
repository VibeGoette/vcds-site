/**
 * Tests for parseGermanDate() in src/lib/german-date.ts.
 *
 * The function converts German long-form dates ("27. Oktober 2025") to
 * ISO-8601 ("2025-10-27") for use in schema.org datePublished fields.
 */
import { describe, it, expect } from 'vitest'
import { parseGermanDate } from '@/lib/german-date'

describe('parseGermanDate — standard conversions', () => {
  it('converts "27. Oktober 2025" to "2025-10-27"', () => {
    expect(parseGermanDate('27. Oktober 2025')).toBe('2025-10-27')
  })

  it('converts "1. Januar 2025" to "2025-01-01" (zero-pads single-digit day)', () => {
    expect(parseGermanDate('1. Januar 2025')).toBe('2025-01-01')
  })

  it('converts "31. Dezember 2099" to "2099-12-31"', () => {
    expect(parseGermanDate('31. Dezember 2099')).toBe('2099-12-31')
  })

  it('converts "5. März 2024" to "2024-03-05" (umlaut month)', () => {
    expect(parseGermanDate('5. März 2024')).toBe('2024-03-05')
  })
})

describe('parseGermanDate — all German month names', () => {
  const cases: [string, string][] = [
    ['1. Januar 2000', '2000-01-01'],
    ['1. Februar 2000', '2000-02-01'],
    ['1. März 2000', '2000-03-01'],
    ['1. April 2000', '2000-04-01'],
    ['1. Mai 2000', '2000-05-01'],
    ['1. Juni 2000', '2000-06-01'],
    ['1. Juli 2000', '2000-07-01'],
    ['1. August 2000', '2000-08-01'],
    ['1. September 2000', '2000-09-01'],
    ['1. Oktober 2000', '2000-10-01'],
    ['1. November 2000', '2000-11-01'],
    ['1. Dezember 2000', '2000-12-01'],
  ]

  for (const [input, expected] of cases) {
    it(`"${input}" → "${expected}"`, () => {
      expect(parseGermanDate(input)).toBe(expected)
    })
  }
})

describe('parseGermanDate — case insensitivity', () => {
  it('converts uppercase month "22. MAI 2025" to "2025-05-22"', () => {
    expect(parseGermanDate('22. MAI 2025')).toBe('2025-05-22')
  })

  it('converts all-lowercase month "10. oktober 2023" to "2023-10-10"', () => {
    expect(parseGermanDate('10. oktober 2023')).toBe('2023-10-10')
  })

  it('converts mixed-case "15. jAnUaR 2020" to "2020-01-15"', () => {
    expect(parseGermanDate('15. jAnUaR 2020')).toBe('2020-01-15')
  })
})

describe('parseGermanDate — fallback behaviour', () => {
  it('returns the input unchanged when it does not match the pattern', () => {
    expect(parseGermanDate('foo bar')).toBe('foo bar')
  })

  it('returns empty string for empty input', () => {
    expect(parseGermanDate('')).toBe('')
  })

  it('returns the input unchanged for an ISO date string (already formatted)', () => {
    expect(parseGermanDate('2025-10-27')).toBe('2025-10-27')
  })

  it('returns the input unchanged for an unrecognised month name', () => {
    // "Oktober" misspelled → no match in months table → fallback
    expect(parseGermanDate('5. Octber 2024')).toBe('5. Octber 2024')
  })
})

describe('parseGermanDate — edge cases', () => {
  it('handles "32. Januar 2025" by accepting it as-is (no day-range validation)', () => {
    // The function does not validate day ranges — it trusts the input.
    // This documents the current behaviour: "32" is accepted and zero-padded.
    const result = parseGermanDate('32. Januar 2025')
    // Either returns as-is (regex doesn't match \d{1,2} for 32 — it does match)
    // or produces "2025-01-32". Document what actually happens:
    expect(typeof result).toBe('string')
    // "32" is two digits so the regex matches; day is NOT range-validated
    expect(result).toBe('2025-01-32')
  })

  it('handles two-digit day correctly', () => {
    expect(parseGermanDate('15. Juni 2023')).toBe('2023-06-15')
  })

  it('handles spacing variants with extra spaces around month', () => {
    // The regex uses \s* so "1.  Januar 2025" (two spaces) should still match
    expect(parseGermanDate('1.  Januar 2025')).toBe('2025-01-01')
  })
})
