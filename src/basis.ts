import { matrix, Matrix, det as determinant } from 'mathjs'
import { randArr, randIntArr, RandArr } from './random'
import { map, equals, always as Return, ifElse } from 'ramda'
import { emptyVector } from './vector'

/*
 * Types
 */
export type GenerateBasis = (r: number, m?: number, n?: number) => Matrix
export type GenerateBasisGen = (t: "int" | "float" ) => GenerateBasis

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
    const randGen : RandArr = ifElse(equals('int'), Return(randIntArr), Return(randArr))(entriesType)
    const vectors = map(() => randGen(rank, min, max), emptyVector(rank))
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

