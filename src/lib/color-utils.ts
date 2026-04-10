/**
 * Lightweight color palette generator.
 * Converts a hex color to HSL, then generates a 50–900 shade scale.
 * No dependencies — pure math.
 */

/**
 * Convert a 6-digit hex color string (e.g. "#2563eb") to HSL components.
 *
 * The conversion follows the standard RGB→HSL algorithm:
 *  1. Normalise R, G, B to the [0, 1] range.
 *  2. Lightness = (max + min) / 2
 *  3. Saturation = delta / (1 - |2L - 1|)  (where delta = max - min)
 *  4. Hue is derived from which channel is dominant (R, G, or B sector).
 *
 * HSL is used — rather than RGB or hex directly — because it lets
 * `generatePalette()` produce a consistent shade scale by varying only the
 * lightness while preserving the hue and (approximately) the saturation.
 * This is what powers the CMS-editable Tailwind CSS variable palette
 * (--color-primary-50 … --color-primary-950).
 *
 * @param hex - A 6-digit hex color string with leading "#".
 * @returns   Object with h (0–360), s (0–100), l (0–100), all rounded to integers.
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const a = sNorm * Math.min(lNorm, 1 - lNorm)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Generate a Tailwind-style shade palette (50–900) from a single hex color.
 * The input color maps roughly to the 500/600 range.
 */
export function generatePalette(hex: string): Record<string, string> {
  const { h, s } = hexToHSL(hex)

  // Target lightness values for each shade (inspired by Tailwind defaults)
  const shades: Record<string, number> = {
    '50': 96,
    '100': 92,
    '200': 85,
    '300': 74,
    '400': 62,
    '500': 50,
    '600': 42,
    '700': 34,
    '800': 26,
    '900': 18,
    '950': 12,
  }

  const palette: Record<string, string> = {}
  for (const [shade, lightness] of Object.entries(shades)) {
    // Slightly reduce saturation for very light and very dark shades
    const satAdjust = lightness > 80 ? s * 0.6 : lightness < 25 ? s * 0.8 : s
    palette[shade] = hslToHex(h, Math.min(satAdjust, 100), lightness)
  }

  return palette
}
