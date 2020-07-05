const { matrix, det: determinant } = require('mathjs')
const { randArr, randIntArr } = require('./random')
const { map } = require('ramda')
const { emptyArray } = require('./array')

/*
 * generateBasis :: str => (int, number, number)
 * type must be 'int' or 'float'
 * rank is the basis rank, ie, n such that the matrix is nxn
 * min/max are the bounds to the random function called inside
 */
const generateBasis = (type) => (rank, min = -100, max = 100) => {
  const randGen = {
    int: randIntArr,
    float: randArr,
  }[type]
  const vectors = map(() => randGen(rank, min, max), emptyArray(rank))
  const basis = matrix(vectors)
  if (determinant(basis) !== 0) return basis
  else return generateBasis(type)(rank, min, max)
}

/*
 * generate an integer basis
 */
const genIntBasis = generateBasis('int')

/*
 * generates a float basis
 */
const genFloatBasis = generateBasis('float')

module.exports = {
  generateBasis,
  genIntBasis,
  genFloatBasis,
}
