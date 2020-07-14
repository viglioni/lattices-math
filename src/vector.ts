import {not,  all, equals, compose, reduce, zipWith, map, always, head, length } from 'ramda'
import {Q, vecToN, add, mul, sub, div, toQ, BinaryQ, sqrt, inverse} from './rational'


/*
 * types
 */
export type UnaryVec = (u: Q[]) => Q[]
export type BinaryVec = (u: Q[], v: Q[]) => Q[]
type CheckDim = (f: BinaryVec) => BinaryVec

/*
 * Check dimentions of vectors in 
 */
const checkDim : CheckDim= (func) => (a,b) => {
  if(equals(0, length(a))) return b
  else if (equals(0, length(b))) return a
  if(not(equals(length(a), length(b)))) throw new Error("vectors must have same length!")
  else return func(a,b)
}

/*
 * Creates a n dim vector 
 */
export const emptyVector = (n : number) : string[]  => Array(n).fill('')

export const nullVec = (dim: number) : Q[] => map(always(toQ(0)) ,emptyVector(dim))

/*
 * tells if a vector is a zero vector
 */
export const isZeroVector : (v: number[] | Q[])=>boolean  = compose(all(equals(0)) , vecToN)

/*
 * dot multiplication
 */
export const dot= (u: Q[], v: Q[]): Q => reduce(add, toQ(0), zipWith(mul, u, v))

/*
 * scalar multiplication
 */
export const scalarMul = (a: Q, U: Q[]) : Q[] => map(x => mul(a,x), U)

/*
 * Binary operations on each entry
 */
const general : (f: BinaryQ) => BinaryVec =
  (func) => (u, v) => zipWith(func, u, v)

export const vecAdd = checkDim(general(add))
export const vecSub = checkDim(general(sub))
export const vecDiv = checkDim(general(div))
export const vecMul = checkDim(general(mul))

/*
 * Unary operations on vectors
 */
export const vecSquare : UnaryVec = (u) => vecMul(u,u)
export const normalize : UnaryVec = (u)  =>
  isZeroVector(u)
  ? u
  : scalarMul(inverse(norm(u)), u)

/*
 * Summation function to vectors
 */
export const vecSum = (vecs : Q[][]) : Q[] =>
  equals(0,length(vecs))
  ? []
  : reduce(vecAdd, nullVec(length( head(vecs) as Q[])), vecs )

export const norm =  compose(sqrt, reduce(add,toQ(0)), vecSquare)


