const { deepFreeze } = require('../src/deep-freeze')

describe('deepFreeze', function () {
    it('should not be able to change property when object is frozen', function () {
        const a = { x: 1 }
        deepFreeze(a)
        expect(Object.isFrozen(a)).toBeTruthy()
        a.x = 2
        a.z = 3
        expect(a.x).toBe(1)
        expect(a.z).toBeUndefined()
    })

    it('should not be able to add item in array', function () {
        const a = { x: 1, y: [10, 20] }
        deepFreeze(a)
        expect(() => {
            a.y.push(30)
        }).toThrow(new TypeError('Cannot add property 2, object is not extensible'))
    })

    it('should not be able to mutate items in arrays', function () {
        const a = { x: 1, y: [10, 20] }
        deepFreeze(a)
        a.y[0] = 50
        expect(a.y[0]).toBe(10)
    })

    it('should handle objects with no properties', () => {
        const obj = {};
        const frozenObj = deepFreeze(obj)
        frozenObj.a = 1
        expect(frozenObj).toEqual({})
    })
})
