import { describe, it, expect } from 'vitest'
import { shallowMap } from '../src/index'

describe('shallowMap', () => {
  it('should transform each value with the provided function', () => {
    const oSource = { a: 1, b: 2, c: 3 }
    expect(shallowMap(oSource, value => value * 10)).toEqual({ a: 10, b: 20, c: 30 })
  })

  it('should pass the key as the second argument', () => {
    const oSource = { a: 1, b: 2 }
    expect(shallowMap(oSource, (value, key) => `${key}:${value}`)).toEqual({ a: 'a:1', b: 'b:2' })
  })

  it('should not recurse into nested objects', () => {
    const nested = { deep: true }
    const result = shallowMap({ x: nested }, value => value)
    expect(result.x).toBe(nested)
  })
})
