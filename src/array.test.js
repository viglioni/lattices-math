const { emptyArray } = require('./array')
const { length } = require('ramda')

test('should have length = 100', () => {
  expect(length(emptyArray(100))).toBe(100)
})
