import { describe, it, expect } from 'vitest'
import {
  hasAdminRole,
  isAdmin,
  isAdminOrMarketing,
  isAdminOrEditor,
  isLoggedIn,
} from '@/access'

// Helper: build a minimal Payload Access argument with a user shape
function makeArg(role?: string) {
  const user = role !== undefined ? { id: 1, email: 'test@vcds.de', role } : undefined
  return { req: { user } } as never
}

describe('hasAdminRole', () => {
  it('returns true for "admin"', () => {
    expect(hasAdminRole('admin')).toBe(true)
  })

  it('returns true for "super-philipp"', () => {
    expect(hasAdminRole('super-philipp')).toBe(true)
  })

  it('returns false for "editor"', () => {
    expect(hasAdminRole('editor')).toBe(false)
  })

  it('returns false for "marketing"', () => {
    expect(hasAdminRole('marketing')).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(hasAdminRole(undefined)).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(hasAdminRole('')).toBe(false)
  })
})

describe('isAdmin', () => {
  it('returns true for role "admin"', () => {
    expect(isAdmin(makeArg('admin'))).toBe(true)
  })

  it('returns true for role "super-philipp"', () => {
    expect(isAdmin(makeArg('super-philipp'))).toBe(true)
  })

  it('returns false for role "editor"', () => {
    expect(isAdmin(makeArg('editor'))).toBe(false)
  })

  it('returns false for role "marketing"', () => {
    expect(isAdmin(makeArg('marketing'))).toBe(false)
  })

  it('returns false when user is undefined', () => {
    expect(isAdmin(makeArg(undefined))).toBe(false)
  })
})

describe('isAdminOrMarketing', () => {
  it('returns true for "admin"', () => {
    expect(isAdminOrMarketing(makeArg('admin'))).toBe(true)
  })

  it('returns true for "super-philipp"', () => {
    expect(isAdminOrMarketing(makeArg('super-philipp'))).toBe(true)
  })

  it('returns true for "marketing"', () => {
    expect(isAdminOrMarketing(makeArg('marketing'))).toBe(true)
  })

  it('returns false for "editor"', () => {
    expect(isAdminOrMarketing(makeArg('editor'))).toBe(false)
  })

  it('returns false when user is undefined', () => {
    expect(isAdminOrMarketing(makeArg(undefined))).toBe(false)
  })
})

describe('isAdminOrEditor', () => {
  it('returns true for "admin"', () => {
    expect(isAdminOrEditor(makeArg('admin'))).toBe(true)
  })

  it('returns true for "super-philipp"', () => {
    expect(isAdminOrEditor(makeArg('super-philipp'))).toBe(true)
  })

  it('returns true for "editor"', () => {
    expect(isAdminOrEditor(makeArg('editor'))).toBe(true)
  })

  it('returns false for "marketing"', () => {
    expect(isAdminOrEditor(makeArg('marketing'))).toBe(false)
  })

  it('returns false when user is undefined', () => {
    expect(isAdminOrEditor(makeArg(undefined))).toBe(false)
  })
})

describe('isLoggedIn', () => {
  it('returns true for any defined user', () => {
    expect(isLoggedIn(makeArg('editor'))).toBe(true)
    expect(isLoggedIn(makeArg('admin'))).toBe(true)
  })

  it('returns false when user is undefined', () => {
    expect(isLoggedIn(makeArg(undefined))).toBe(false)
  })
})
