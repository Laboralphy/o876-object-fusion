const { deepClone, deepMerge } = require('../index')

describe('#deepClone', function () {
  it('les objets doivent être identique', function () {
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

describe('#deepMerge', function () {
  it('les objets doivent être fusionnés', function () {
    const oSource = {
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
        liste: [ 'jan', 'fev', 'avr', { f: 3, d: 9.9, e: Infinity, tuple: [true, false] }, 'mar', { d: 9.55, xx: 100 }]
      },
      beta: [ 9, 5, 1.1, 5 ],
      gamma: 'zozozo',
      delta: 'hhhh'
    })
  })
})

describe('using transformation function', function () {
  it('should transform all values in uppercase when using transformation function', function () {
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
    expect(deepClone(oSource, x => x.toUpperCase())).toEqual(oExpected)
  })
})