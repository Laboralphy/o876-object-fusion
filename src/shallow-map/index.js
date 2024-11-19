/**
 * This is a simple objet shallow transformation without recursive mechanism
 * The provided function accept (value, key) parameters and must return the new value
 * @param oObject {{[p: string]: *}}
 * @param f {function}
 * @returns {{[p: string]: *}}
 */
function shallowMap (oObject, f) {
    return Object.fromEntries(
        Object
            .entries(oObject)
            .map(([key, value]) => [key, f(value, key)])
    )
}

module.exports = {
    shallowMap
}
