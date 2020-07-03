const { equals, map, apply, unapply, forEach } = require('ramda')
const { projection } = require('./gram-schmidt')
const { fraction } = require('mathjs')

test('should return 0 vector when u is 0', () => {
  const proj = projection([0, 0, 0, 0, 0])([1, 2, 3, 4, 5])
  expect(equals(proj, [0, 0, 0, 0, 0])).toBeTruthy()
})

test('should return correct values', () => {
  const testHelper = apply((u, v, result) => {
    expect(equals(projection(u)(v), map(apply(fraction), result))).toBeTruthy()
  })
  const valuesToTest = [
    [
      [1, 2],
      [3, 4],
      [
        [11, 5],
        [22, 5],
      ],
    ],
    [
      [1, 2, -10, 15, 18],
      [33, 0, -12, 3, 4],
      [
        [45, 109],
        [90, 109],
        [-450, 109],
        [675, 109],
        [810, 109],
      ],
    ],
    [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [[0], [0], [0], [0], [0], [0], [1], [0], [0], [0]],
    ],
  ]

  forEach(testHelper, valuesToTest)
})
