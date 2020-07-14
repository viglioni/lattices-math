import { isZeroVector } from './vector'
import { Q, vecToQ, div, matrixToQ, matrixToN, vecToN} from './rational'
import { dot, scalarMul, vecSub, vecSum, normalize } from './vector'
import {compose, length, append, mapAccum, map, juxt} from 'ramda'

/*
 * Types
 */
export type Projection = (u :  number[] | Q[]) => (v : number[] | Q[]) => Q[]


/*
 * Functions
 */

/*
 * Projection of a vector
 * proj_u (v) := (<v,u>/<u,u>)*u
 * where <,> is dot product
 */
export const projection : Projection = (u) => (v) => {
  const U = vecToQ(u)
  const V = vecToQ(v)
  return isZeroVector(U) ? U : scalarMul(div(dot(U, V), dot(U, U)), U)
 }


/*
 * Orthogonalization process
 * this function was made using Gram-Schmidt process
 * without normalizing each vector 
 */
export const orthogonalize = (matrix : Q[][] | number[][]) => {
  return mapAccum(
    (acc : Q[][], val : Q[]) => {
      const projections = map(projection , acc)
      const appliedProjs = juxt(projections)(val)
      const u = vecSub(val , vecSum(appliedProjs))
      return [append(u,acc) , u]
    },
    [],
    matrixToQ(matrix))[1]
}

/*
 * Gram-Schmidt proccess for orthonormalization of matrixes
 * in: set {v1, v2, ..., vn}
 * out: set {u1, u2, ..., un} where each ui is orthonormal in the set
 */
export const gramSchmidt = compose(map(normalize), orthogonalize)

