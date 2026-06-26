/**
 * Recursively compares two values for structural equality. Handles primitives,
 * arrays and plain objects (key order independent).
 * @param obj1 first value
 * @param obj2 second value
 * @returns true when both values are deeply equal
 */
function deepEqual (obj1: unknown, obj2: unknown): boolean {
  // Strictly equal values are equal.
  if (obj1 === obj2) {
    return true
  }

  // Either value is null or not an object: not equal (=== already handled equality).
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  // Arrays.
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false
      }
    }
    return true
  }

  // One is an array and the other is not.
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    return false
  }

  const o1 = obj1 as Record<string, unknown>
  const o2 = obj2 as Record<string, unknown>
  const keys1 = Object.keys(o1)
  const keys2 = Object.keys(o2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(o1[key], o2[key])) {
      return false
    }
  }

  return true
}

export { deepEqual }
