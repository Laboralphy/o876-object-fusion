import { describe, it, expect } from 'vitest'
import { deepFreeze } from '../src/index'

describe('deepFreeze', () => {
  it('should not be able to change property when object is frozen', () => {
    const a: Record<string, number> = { x: 1 }
    deepFreeze(a)
    expect(Object.isFrozen(a)).toBeTruthy()
    // In strict mode (ESM) assigning to a frozen object throws instead of silently failing.
    expect(() => { a.x = 2 }).toThrow()
    expect(() => { a.z = 3 }).toThrow()
    expect(a.x).toBe(1)
    expect(a.z).toBeUndefined()
  })

  it('should not be able to add item in array', () => {
    const a = { x: 1, y: [10, 20] }
    deepFreeze(a)
    expect(() => {
      a.y.push(30)
    }).toThrow(new TypeError('Cannot add property 2, object is not extensible'))
  })

  it('should not be able to mutate items in arrays', () => {
    const a = { x: 1, y: [10, 20] }
    deepFreeze(a)
    expect(() => { a.y[0] = 50 }).toThrow()
    expect(a.y[0]).toBe(10)
  })

  it('should handle objects with no properties', () => {
    const obj: Record<string, unknown> = {}
    const frozenObj = deepFreeze(obj)
    expect(() => { (frozenObj as Record<string, unknown>).a = 1 }).toThrow()
    expect(frozenObj).toEqual({})
  })
})
