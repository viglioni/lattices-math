import { isZeroVector } from './vector'
import {Q, vecToQ , div} from './rational'
import { dot, scalarMul } from './vector'


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

