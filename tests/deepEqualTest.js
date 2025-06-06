const { deepEqual } = require('../index')

describe('deepEqual', function () {
    it('should return true when object have same properties but not inserted in same order', function () {
        const a = {
            x: 1,
            y: 2
        }
        const b = {
            y: 2,
            x: 1
        }
        expect(deepEqual(a, b)).toBeTruthy()
    })
    it('should return true when object have array properties', function () {
        const a = {
            x: 1,
            y: ['a', 'b']
        }
        const b = {
            y: ['a', 'b'],
            x: 1
        }
        expect(deepEqual(a, b)).toBeTruthy()
    })
    it('should return false when object have array properties with different length', function () {
        const a = {
            x: 1,
            y: ['a', 'b', 'c']
        }
        const b = {
            y: ['a', 'b'],
            x: 1
        }
        expect(deepEqual(a, b)).toBeFalsy()
    })
})
