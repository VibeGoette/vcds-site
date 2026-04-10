/**
 * Simple numeric version comparison: returns -1, 0, or 1.
 *
 * PERF-15: pre-release suffixes (e.g. '25.3.1-beta.1') are truncated before
 * parsing so they don't produce NaN components. The comparison is purely
 * numeric on the major.minor.patch segments — pre-release ordering is NOT
 * honoured. Good enough for VCDS's min-version gate; switch to `semver` if
 * full SemVer precedence is ever needed.
 *
 * Non-numeric garbage in any segment (e.g. "25.x.1") is coerced to 0 via the
 * Number.isFinite guard, matching how the rest of the route treats invalid
 * data as "no update available" rather than crashing.
 *
 * Lives in `src/lib/` rather than next to the route handler because Next.js 15
 * forbids named exports from `app/api/**\/route.ts` files — only HTTP method
 * handlers are allowed. Extracting the helper here keeps it unit-testable.
 */
export function compareVersions(a: string, b: string): number {
  const parse = (v: string): number[] =>
    v.split('-')[0]
      .split('.')
      .map((segment) => {
        const n = Number(segment)
        return Number.isFinite(n) ? n : 0
      })
  const pa = parse(a)
  const pb = parse(b)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const na = pa[i] ?? 0
    const nb = pb[i] ?? 0
    if (na > nb) return 1
    if (na < nb) return -1
  }
  return 0
}
