import type { Access, FieldAccess } from 'payload'

/**
 * Access Control for VCDS.de
 *
 * Roles:
 *   - super-philipp: Full access + Custom CSS editing
 *   - admin:         Full access to everything
 *   - marketing:     Posts, FAQ, Testimonials, SEO fields, Keywords
 *   - editor:        Pages, Posts, Products (read + update, no delete)
 */

function hasAdminRole(role?: string): boolean {
  return role === 'super-philipp' || role === 'admin'
}

// ── Collection-Level Access ──

export const isAdmin: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role)
}

export const isAdminOrMarketing: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role) || user?.role === 'marketing'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role) || user?.role === 'editor'
}

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/** Public read, authenticated write */
export const publicReadAdminWrite = {
  read: () => true,
  create: isAdmin,
  update: isAdminOrEditor,
  delete: isAdmin,
}

/** Public read, marketing + admin can write */
export const publicReadMarketingWrite = {
  read: () => true,
  create: isAdminOrMarketing,
  update: isAdminOrMarketing,
  delete: isAdmin,
}

/** Only admins can CRUD */
export const adminOnly = {
  read: isAdmin,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}

// ── Field-Level Access ──

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return hasAdminRole(user?.role)
}

export const superPhilippOnly: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'super-philipp'
}
