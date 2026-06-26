import { describe, it, expect } from 'vitest'
import { deepClone, deepMerge } from '../src/index'

describe('#deepClone', () => {
  it('les objets doivent être identique', () => {
    const oSource = {
      alpha: {
        x: 20,
        nom: 'zeratul',
        liste: ['jan', 'fev', 'avr', { f: 3, d: 9.9, e: Infinity, tuple: [true, false] }]
      },
      beta: [9, 5, 1.1],
      gamma: 'zozozo'
    }
    const oTarget = deepClone(oSource)
    expect(oTarget).toEqual(oSource)
    expect(oTarget).not.toBe(oSource)
    expect(oTarget.alpha).not.toBe(oSource.alpha)
    expect(oTarget.alpha.liste).not.toBe(oSource.alpha.liste)
    expect(oTarget.alpha.liste[3]).not.toBe(oSource.alpha.liste[3])
  })
})

describe('#deepClone Set', () => {
  it('should clone a Set into a new independent Set', () => {
    const inner = { a: 1 }
    const oSource = new Set<unknown>([1, 'two', inner])
    const oTarget = deepClone(oSource)
    expect(oTarget).toBeInstanceOf(Set)
    expect(oTarget).not.toBe(oSource)
    expect([...oTarget]).toEqual([1, 'two', { a: 1 }])
    // nested object members are deep-cloned, not shared
    expect([...oTarget][2]).not.toBe(inner)
  })

  it('should apply the transform function to Set members', () => {
    const oSource = new Set(['alpha', 'beta'])
    const oTarget = deepClone(oSource, x => (x as string).toUpperCase())
    expect([...oTarget]).toEqual(['ALPHA', 'BETA'])
  })
})

describe('#deepClone Map', () => {
  it('should clone a Map into a new independent Map', () => {
    const innerKey = { k: 1 }
    const innerVal = { v: 2 }
    const oSource = new Map<unknown, unknown>([
      ['plain', 10],
      [innerKey, innerVal]
    ])
    const oTarget = deepClone(oSource)
    expect(oTarget).toBeInstanceOf(Map)
    expect(oTarget).not.toBe(oSource)
    expect(oTarget.get('plain')).toBe(10)
    // keys and values are deep-cloned
    const clonedEntry = [...oTarget].find(([k]) => k !== 'plain')!
    expect(clonedEntry[0]).toEqual(innerKey)
    expect(clonedEntry[0]).not.toBe(innerKey)
    expect(clonedEntry[1]).toEqual(innerVal)
    expect(clonedEntry[1]).not.toBe(innerVal)
  })

  it('should apply the transform function to Map keys and values', () => {
    const oSource = new Map([['a', 'x'], ['b', 'y']])
    const oTarget = deepClone(oSource, v => (v as string).toUpperCase())
    expect([...oTarget]).toEqual([['A', 'X'], ['B', 'Y']])
  })
})

describe('#deepMerge', () => {
  it('les objets doivent être fusionnés', () => {
    const oSource: Record<string, any> = {
      alpha: {
        x: 20,
        nom: 'zeratul',
        liste: ['jan', 'fev', 'avr', { f: 3, d: 9.9, e: Infinity, tuple: [true, false] }]
      },
      beta: [9, 5, 1.1],
      gamma: 'zozozo'
    }
    const oSource2 = {
      alpha: {
        x: 25,
        liste: ['mar', { d: 9.55, xx: 100 }]
      },
      beta: [5],
      delta: 'hhhh'
    }
    const oTarget = deepMerge(oSource, oSource2)
    expect(oTarget).toEqual(oSource)
    expect(oTarget).toEqual({
      alpha: {
        x: 25,
        nom: 'zeratul',
        liste: ['jan', 'fev', 'avr', { f: 3, d: 9.9, e: Infinity, tuple: [true, false] }, 'mar', { d: 9.55, xx: 100 }]
      },
      beta: [9, 5, 1.1, 5],
      gamma: 'zozozo',
      delta: 'hhhh'
    })
  })
})

describe('using transformation function', () => {
  it('should transform all values in uppercase when using transformation function', () => {
    const oSource = {
      test1: 'alpha',
      test2: ['beta', 'gamma', 'delta'],
      test3: {
        t30: 'eta',
        t31: {
          t310: 'theta',
          t311: 'iota',
          t312: 'kappa'
        },
        t32: [
          {
            t32x1: 'lambda',
            t32x2: 'mu',
            t32x3: 'nu'
          },
          {
            t32y1: 'pi',
            t32y2: 'rho',
            t32y3: 'sigma'
          }
        ]
      }
    }
    const oExpected = {
      test1: 'ALPHA',
      test2: ['BETA', 'GAMMA', 'DELTA'],
      test3: {
        t30: 'ETA',
        t31: {
          t310: 'THETA',
          t311: 'IOTA',
          t312: 'KAPPA'
        },
        t32: [
          {
            t32x1: 'LAMBDA',
            t32x2: 'MU',
            t32x3: 'NU'
          },
          {
            t32y1: 'PI',
            t32y2: 'RHO',
            t32y3: 'SIGMA'
          }
        ]
      }
    }
    expect(deepClone(oSource, x => (x as string).toUpperCase())).toEqual(oExpected)
  })
})
