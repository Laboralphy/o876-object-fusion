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
