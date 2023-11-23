const deepClone = require('../deep-clone')

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject (item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 * @param aRecurs {any[]}
 */
function mergeDeep (target, source, aRecurs = []) {
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
        mergeDeep(target[key], item, aRecurs)
      } else if (Array.isArray(item)) {
        if (!(key in target)) {
          target[key] = []
        }
        if (!Array.isArray(target[key])) {
          throw new TypeError('"' + key + '" needs to be an array.')
        }
        item.forEach(x => target[key].push(deepClone(x)))
      } else {
        Object.assign(target, { [key]: item })
      }
    }
  }
  return target
}

module.exports = mergeDeep
