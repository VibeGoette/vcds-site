import { describe, it, expect } from 'vitest'
import { calculateReadingTime } from '../lib/blog-utils'

describe('calculateReadingTime', () => {
  it('returns 1 for empty post', () => {
    expect(calculateReadingTime({})).toBe(1)
  })

  it('calculates from changelog', () => {
    // 200 words = 1 min, 400 words = 2 min
    const words = Array(400).fill('wort').join(' ')
    expect(calculateReadingTime({ changelog: words })).toBe(2)
  })

  it('calculates from excerpt', () => {
    const words = Array(600).fill('wort').join(' ')
    expect(calculateReadingTime({ excerpt: words })).toBe(3)
  })

  it('prefers changelog over excerpt', () => {
    const short = Array(200).fill('kurz').join(' ')
    const long = Array(1000).fill('lang').join(' ')
    expect(calculateReadingTime({ changelog: short, excerpt: long })).toBe(1)
  })

  it('returns at least 1 minute', () => {
    expect(calculateReadingTime({ excerpt: 'kurz' })).toBe(1)
  })

  it('handles null/undefined fields', () => {
    expect(calculateReadingTime({ changelog: null, excerpt: null })).toBe(1)
  })
})
