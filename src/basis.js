const { matrix, det: determinant } = require('mathjs')
const { randArr, randIntArr } = require('./random')
const { map } = require('ramda')
const { emptyArray } = require('./array')

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

const genIntBasis = generateBasis('int')
const genFloatBasis = generateBasis('float')

module.exports = {
  generateBasis,
  genIntBasis,
  genFloatBasis,
}
