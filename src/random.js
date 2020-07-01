const { compose, map } = require('ramda')
const { emptyArray } = require('./array')

const rand = (min, max) => (max - min) * Math.random() + min

const randInt = compose(Math.floor, rand)

const randArrGeneric = (randFunc) => (n, min, max) => map(() => randFunc(min, max), emptyArray(n))

const randArr = randArrGeneric(rand)

const randIntArr = randArrGeneric(randInt)

module.exports = {
  rand,
  randInt,
  randArrGeneric,
  randIntArr,
  randArr,
}
