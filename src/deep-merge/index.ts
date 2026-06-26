import { deepClone } from '../deep-clone/index.js'

/**
 * Simple object check.
 * @param item value to test
 * @returns true when item is a non-array object
 */
function isObject (item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge source into target, mutating and returning target. Nested objects are
 * merged recursively, arrays are concatenated (with deep-cloned source items) and
 * every other value overwrites the target. Throws on circular source references.
 * @param target object that receives the merged values
 * @param source object whose values are merged in
 * @param aRecurs internal accumulator used to detect circular references
 * @returns the mutated target
 */
function mergeDeep<T extends Record<string, any>, S extends Record<string, any>> (
  target: T,
  source: S,
  aRecurs: unknown[] = []
): T & S {
  if (isObject(target) && isObject(source)) {
    for (const [key, item] of Object.entries(source)) {
      if (isObject(item)) {
        if (aRecurs.indexOf(item) >= 0) {
          throw new Error('ERR_MERGE_RECURSIVE')
        }
        aRecurs.push(item)
        if (!(key in target)) {
          Object.assign(target, { [key]: {} })
        }
        mergeDeep((target as Record<string, any>)[key], item, aRecurs)
      } else if (Array.isArray(item)) {
        if (!(key in target)) {
          (target as Record<string, any>)[key] = []
        }
        if (!Array.isArray((target as Record<string, any>)[key])) {
          throw new TypeError('"' + key + '" needs to be an array.')
        }
        item.forEach(x => (target as Record<string, any>)[key].push(deepClone(x)))
      } else {
        Object.assign(target, { [key]: item })
      }
    }
  }
  return target as T & S
}

export { mergeDeep as deepMerge }
