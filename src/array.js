const { all, equals } = require('ramda')

const emptyArray = (n) => Array(n).fill()

const isZeroVector = all(equals(0))

module.exports = {
  emptyArray,
  isZeroVector,
}
