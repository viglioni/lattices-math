const { emptyArray, isZeroVector } = require('./array')
const { length, range, tail, map, forEach } = require('ramda')

test('should have length = 100', () => {
  expect(length(emptyArray(100))).toBe(100)
})

test('should return true to any n-dim zero vector', () => {
  const dimentions = tail(range(0, 100))
  const nullVecs = map((dim) => Array(dim).fill(0), dimentions)
  forEach((vec) => {
    expect(isZeroVector(vec)).toBeTruthy()
  }, nullVecs)
})

test('should return false on a non-zero vec', () => {
  expect(isZeroVector([0, 0, 0, 0, 1, 0])).toBeFalsy()
})
