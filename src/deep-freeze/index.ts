export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

/**
 * Returns true if o is a pure object (not Array, not Map, not Set, not Date...).
 * @param o value to test
 * @returns true for plain objects
 */
function isObject (o: unknown): o is Record<string, unknown> {
  return typeof o === 'object' && o !== null && o.constructor?.name === 'Object'
}

/**
 * Recursively freezes an object, making it (and everything it references) fully
 * immutable.
 * @param o value to freeze
 * @returns the same value, now deeply frozen
 */
function deepFreeze<T> (o: T): DeepReadonly<T> {
  if (o === undefined || Object.isFrozen(o)) {
    return o as DeepReadonly<T>
  } else if (isObject(o) || typeof o === 'function') {
    Object.getOwnPropertyNames(o).forEach(prop => {
      deepFreeze((o as Record<string, unknown>)[prop])
    })
    Object.freeze(o)
  } else if (Array.isArray(o)) {
    o.forEach(item => {
      deepFreeze(item)
    })
    Object.freeze(o)
  }
  return o as DeepReadonly<T>
}

export { deepFreeze }
