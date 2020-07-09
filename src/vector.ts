import { all, equals, compose, reduce, zipWith, map } from 'ramda'
import {Q, vecToN, add, mul, toQ} from './rational'


/*
 * Creates a n dim vector 
 */
export const emptyVector = (n : number) : string[]  => Array(n).fill('')

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
