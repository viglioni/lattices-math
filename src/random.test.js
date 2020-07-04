const { randInt, rand, randIntArr } = require('./random')
const { length, map, and } = require('ramda')

test('should be integer and between 10 and 20', () => {
  const result = randInt(10, 20)

  expect(String(result)).toMatch(/[0-9]/)
  expect(result).not.toBeNaN()
  expect(result).toBeGreaterThanOrEqual(10)
  expect(result).toBeLessThan(20)
})

test('should be result to be negative', () => {
  expect(randInt(-100, 0)).toBeLessThan(0)
})

test('should be in bounds', () => {
  const result = rand(-100, 100)
  expect(result).not.toBeNaN()
  expect(result).toBeGreaterThanOrEqual(-100)
  expect(result).toBeLessThan(100)
})

test('should be an array of random in bound numbers', () => {
  const result = randIntArr(100, -10, 10)
  const bounds = map((n) => and(n >= -10, n < 10), result)
  expect(length(result)).toBe(100)
  expect(bounds).toBeTruthy()
})
