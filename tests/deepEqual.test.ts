import { describe, it, expect } from 'vitest'
import { deepEqual } from '../src/index'

describe('deepEqual', () => {
  it('should return true when object have same properties but not inserted in same order', () => {
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
  it('should return true when object have array properties', () => {
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
  it('should return false when object have array properties with different length', () => {
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
