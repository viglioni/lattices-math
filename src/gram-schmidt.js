const { dot, multiply, fraction } = require('mathjs')
const { equals } = require('ramda')
const { isZeroVector } = require('./array')

/*
 * projection :: [a] => [a] => frac[a]
 * Projection of a vector
 * proj_u (v) := (<v,u>/<u,u>)*u
 * where <,> is dot product
 */
const projection = (u) => (v) => (isZeroVector(u) ? u : multiply(fraction(dot(u, v), dot(u, u)), u))

module.exports = {
  projection,
}
