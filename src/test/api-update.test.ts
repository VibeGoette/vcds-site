import { describe, it, expect } from 'vitest'
import { compareVersions } from '@/lib/compare-versions'

describe('compareVersions', () => {
  it('returns 1 when a is greater than b (patch)', () => {
    expect(compareVersions('25.3.1', '25.3.0')).toBe(1)
  })

  it('returns 0 when versions are equal', () => {
    expect(compareVersions('25.3.1', '25.3.1')).toBe(0)
  })

  it('returns -1 when a is less than b (patch)', () => {
    expect(compareVersions('25.3.0', '25.3.1')).toBe(-1)
  })

  it('returns 1 when a has greater minor version', () => {
    expect(compareVersions('25.4.0', '25.3.9')).toBe(1)
  })

  it('returns -1 when a has lesser major version', () => {
    expect(compareVersions('24.0.0', '25.0.0')).toBe(-1)
  })

  it('strips pre-release suffix before comparison — treats 25.3.1-beta.1 as equal to 25.3.1', () => {
    expect(compareVersions('25.3.1-beta.1', '25.3.1')).toBe(0)
  })

  it('strips pre-release on both sides', () => {
    expect(compareVersions('25.3.1-beta.1', '25.3.0-rc.2')).toBe(1)
  })

  it('coerces NaN segments to 0 — "25.x.1" vs "25.0.1"', () => {
    expect(compareVersions('25.x.1', '25.0.1')).toBe(0)
  })

  it('handles different segment counts — "25" vs "25.0.0"', () => {
    expect(compareVersions('25', '25.0.0')).toBe(0)
  })

  it('handles "25.3" vs "25.3.0"', () => {
    expect(compareVersions('25.3', '25.3.0')).toBe(0)
  })

  it('handles single-segment version greater', () => {
    expect(compareVersions('26', '25.9.9')).toBe(1)
  })
})
