const { multiply, add, fraction, divide } = require('mathjs')
const { equals, reduce, zipWith } = require('ramda')
const { isZeroVector } = require('./array')

const dotFraction = (u, v) => reduce(add, 0, zipWith(multiply, u, v))

/*
 * projection :: [a] => [a] => frac[a]
 * Projection of a vector
 * proj_u (v) := (<v,u>/<u,u>)*u
 * where <,> is dot product
 */
const projection = (u) => (v) => {
  const U = fraction(u)
  const V = fraction(v)
  return isZeroVector(U) ? U : multiply(divide(dotFraction(U, V), dotFraction(U, U)), U)
}

module.exports = {
  projection,
}
