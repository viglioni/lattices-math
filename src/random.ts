import  { compose, map } from'ramda'
import  { emptyVector } from'./vector'

/*
 * Types
 */
export type RandFunc = (a: number, b: number, ) =>  number
export type RandArr = (a: number, b: number, c: number) => number[]
export type RandArrGen = (f:RandFunc) => RandArr

/*
 * Functions
 */

/*
 * rand
 * generates a random float number given a range
 */
export const rand : RandFunc = (min, max) => (max - min) * Math.random() + min

/*
 * randInt
 * generates a random integer number given a range
 */
export const randInt = compose(Math.floor, rand)


/*
 * randArrGeneric
 * Generates an array of random numbers given type (int|float) and a range
 */
export const randArrGeneric : RandArrGen =
  (randFunc) => (n, min, max) => map(() => randFunc(min, max), emptyVector(n))

/*
 * randArr
 * Generates an array of floats
 */
export const randArr = randArrGeneric(rand)

/*
 * randIntArr
 * Generates an array of integers
 */
export const randIntArr = randArrGeneric(randInt)

