const { equals, map, apply, unapply, forEach } = require('ramda')
const { projection } = require('./gram-schmidt')
const { fraction, round } = require('mathjs')

test('should return 0 vector when u is 0', () => {
  const proj = projection([0, 0, 0, 0, 0])([1, 2, 3, 4, 5])
  expect(equals(proj, fraction([0, 0, 0, 0, 0]))).toBeTruthy()
})

test('should return correct values', () => {
  const testHelper = apply((u, v, result) => {
    expect(equals(round(projection(u)(v), 4), round(map(apply(fraction), result), 4))).toBeTruthy()
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
    [
      [0.87, -0.99, 88, 0.12345],
      [1.1, 12, 13.1313, 888],
      [[0.140877], [-0.160309], [14.2497], [0.01999]],
    ],
    [
      [-0.8887, -0.99, 0.7, -10.25],
      [0.1, 0.12, 0.00013, -0.0008],
      [[0.00165099], [0.00183918], [-0.00130043], [0.019042]],
    ],
  ]

  forEach(testHelper, valuesToTest)
})
