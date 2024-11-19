/**
 * Returns true id o is a pure object (not Array, not Map, not Set, not Date...)
 * @param o {any}
 * @returns {boolean}
 */
function isObject (o) {
    return typeof !!o && typeof o === 'object' && o.constructor?.name === 'Object'
}

/**
 * utilitaire de freezage d'objet. Permet de rendre un objet totalement immutable
 * @param o {object} objet à freezer
 * @returns {object} objet freezé
 * @private
 */
function deepFreeze (o) {
    if (Object.isFrozen(o) || o === undefined) {
        return o
    } else if (isObject(o) || typeof o === 'function') {
        Object.getOwnPropertyNames(o).forEach(prop => {
            deepFreeze(o[prop])
        })
        Object.freeze(o)
    } else if (Array.isArray(o)) {
        o.forEach(item => {
            deepFreeze(item)
        })
        Object.freeze(o)
    }
    return o
}

module.exports = {
    deepFreeze
}
