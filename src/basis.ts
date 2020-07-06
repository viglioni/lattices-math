import { matrix, Matrix, det as determinant } from 'mathjs'
import { randArr, randIntArr } from './random'
import { map, cond, equals, always as Return } from 'ramda'
import { emptyArray } from './array'

/*
 * Types
 */
export type GenerateBasis = (r: number, m?: number, n?: number) => Matrix
export type GenerateBasisGen = (t: string) => GenerateBasis

/*
 * Functions
 */

/*
 * generateBasis
 * given a type (int|float), a rank n and a range returns a 
 * lattice basis, i.e. non-singular matrix nxn with random
 * entries in given range
 */
export const generateBasis : GenerateBasisGen =
  (entriesType) => (rank, min = -100, max = 100) => {
    const randGen = cond([
      [equals('int'), Return(randIntArr)],
      [equals('float'), Return(randArr)]
    ])(entriesType)

  const vectors = map(() => randGen(rank, min, max), emptyArray(rank))
  const basis = matrix(vectors)
  if (determinant(basis) !== 0) return basis
  else return generateBasis(entriesType)(rank, min, max)
}

/*
 * genIntBasis
 * returns an integer basis
 */
export const genIntBasis = generateBasis('int')

/*
 * genFloatBasis
 * returns a float basis
 */
export const genFloatBasis = generateBasis('float')

