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

/** Returns true for the two admin-tier roles ('admin' and 'super-philipp'). */
export function hasAdminRole(role?: string): boolean {
  return role === 'super-philipp' || role === 'admin'
}

// ── Collection-Level Access ──

/** Grants access only to admin-tier roles (admin, super-philipp). Used on sensitive collections such as Users and ContactSubmissions. */
export const isAdmin: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role)
}

/** Grants access to admin-tier roles and the marketing role. Used on content collections where marketing staff need write access (Posts, FAQs, Testimonials). */
export const isAdminOrMarketing: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role) || user?.role === 'marketing'
}

/** Grants access to admin-tier roles and the editor role. Used on page/product collections where editors can create and update but not delete. */
export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return hasAdminRole(user?.role) || user?.role === 'editor'
}

/** Grants access to any authenticated user regardless of role. Used for operations every logged-in user should be able to perform (e.g. reading their own profile). */
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

/** Field-level guard: only admin-tier roles can read or write the annotated field. Typically used on role assignment and system-internal fields. */
export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return hasAdminRole(user?.role)
}

/** Field-level guard: restricts a field to the super-philipp role only. Used for the custom CSS editor, which has the most elevated trust level. */
export const superPhilippOnly: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'super-philipp'
}
