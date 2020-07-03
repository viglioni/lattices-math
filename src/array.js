const { all, equals, compose } = require('ramda')
const { number } = require('mathjs')

const emptyArray = (n) => Array(n).fill()

/*
 * isZeroVector :: [integer | rational] => bool
 */
const isZeroVector = compose(all(equals(0)), number)

module.exports = {
  emptyArray,
  isZeroVector,
}
