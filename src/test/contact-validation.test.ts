import { describe, it, expect } from 'vitest'

/**
 * Tests for the contact form validation and sanitization logic.
 * We extract and test the pure functions independently from the route handler.
 */

// Re-implement the sanitize function to test it (it's not exported from the route)
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
}

// Re-implement the email regex from the route
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

describe('sanitize', () => {
  it('escapes HTML entities', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    )
  })

  it('escapes ampersands', () => {
    expect(sanitize('A & B')).toBe('A &amp; B')
  })

  it('escapes single quotes', () => {
    expect(sanitize("it's")).toBe('it&#39;s')
  })

  it('trims whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello')
  })

  it('handles empty string', () => {
    expect(sanitize('')).toBe('')
  })

  it('handles multiple HTML injections', () => {
    expect(sanitize('"><img src=x onerror=alert(1)>')).toBe(
      '&quot;&gt;&lt;img src=x onerror=alert(1)&gt;'
    )
  })
})

describe('email validation', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('test.name@domain.de')).toBe(true)
    expect(isValidEmail('a@b.co')).toBe(true)
  })

  it('rejects emails without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false)
  })

  it('rejects emails without domain', () => {
    expect(isValidEmail('user@')).toBe(false)
  })

  it('rejects emails without TLD', () => {
    expect(isValidEmail('user@domain')).toBe(false)
  })

  it('rejects emails with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false)
    expect(isValidEmail('user@ example.com')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('contact form field validation rules', () => {
  // These tests document the validation rules applied in the route handler

  function validateName(name: unknown): string | null {
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return 'Bitte geben Sie Ihren Namen ein.'
    }
    return null
  }

  function validateMessage(message: unknown): string | null {
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return 'Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen).'
    }
    return null
  }

  it('rejects empty name', () => {
    expect(validateName('')).not.toBeNull()
    expect(validateName(null)).not.toBeNull()
    expect(validateName(undefined)).not.toBeNull()
  })

  it('rejects single-char name', () => {
    expect(validateName('A')).not.toBeNull()
  })

  it('accepts two-char name', () => {
    expect(validateName('Li')).toBeNull()
  })

  it('rejects non-string name', () => {
    expect(validateName(123)).not.toBeNull()
    expect(validateName({ name: 'test' })).not.toBeNull()
  })

  it('rejects message shorter than 10 chars', () => {
    expect(validateMessage('Hallo')).not.toBeNull()
    expect(validateMessage('123456789')).not.toBeNull()
  })

  it('accepts message with 10+ chars', () => {
    expect(validateMessage('1234567890')).toBeNull()
    expect(validateMessage('Ich habe ein Problem mit meinem VCDS.')).toBeNull()
  })

  it('rejects empty/null message', () => {
    expect(validateMessage('')).not.toBeNull()
    expect(validateMessage(null)).not.toBeNull()
  })
})
