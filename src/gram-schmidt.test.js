const { equals, map, apply } = require('ramda')
const { projection } = require('./gram-schmidt')
const { fraction } = require('mathjs')

test('should return 0 vector when u is 0', () => {
  const proj = projection([0])([1, 2, 3, 4, 5])
  expect(equals(proj, [0])).toBeTruthy()
})

test('should return correct values', () => {
  const testHelper = (u, v, result) => {
    expect(equals(projection(u)(v), map(apply(fraction), result))).toBeTruthy()
  }
  testHelper(
    [1, 2],
    [3, 4],
    [
      [11, 5],
      [22, 5],
    ],
  )
})
