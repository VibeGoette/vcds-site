/**
 * Payload validator for `type: 'json'` fields that are expected to hold an
 * array of non-empty strings (e.g. tags, specialties, compatible adapters).
 *
 * Rejects: non-arrays, arrays containing non-string entries, arrays with
 * empty/whitespace-only strings. Empty arrays and null/undefined pass (the
 * field's own `required` config handles missing values).
 *
 * Usage in a collection field definition:
 *   { name: 'tags', type: 'json', validate: validateStringArray }
 */
export const validateStringArray = (
  value: unknown,
): true | string => {
  if (value === null || value === undefined) return true
  if (!Array.isArray(value)) {
    return 'Muss eine Liste von Einträgen sein (JSON-Array).'
  }
  for (const entry of value) {
    if (typeof entry !== 'string') {
      return 'Jeder Eintrag muss eine Zeichenkette sein.'
    }
    if (entry.trim().length === 0) {
      return 'Leere Einträge sind nicht erlaubt.'
    }
  }
  return true
}
