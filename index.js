const { deepClone } = require('./src/deep-clone')
const { deepMerge } = require('./src/deep-merge')
const { shallowMap } = require('./src/shallow-map')
const { deepFreeze } = require('./src/deep-freeze')
const { deepEqual } = require('./src/deep-equal')

module.exports = {
    deepClone,
    deepMerge,
    shallowMap,
    deepFreeze,
    deepEqual
}
