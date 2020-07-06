import { multiply, add, fraction, divide, Fraction, } from 'mathjs'
import { reduce, zipWith } from 'ramda'
import { isZeroVector } from './array'


/*
 * declares
 */
declare function multiply(a: Fraction , b: Fraction):Fraction
declare function multiply(a: Fraction , b: Fraction[]):Fraction[]
declare function add(a: Fraction, b: Fraction):Fraction
declare function zipWith(fn: (x: Fraction, y: Fraction) => Fraction, list1: Fraction[], list2: Fraction[]):Fraction[]
declare function reduce(fn:(acc:Fraction, elem:Fraction)=>Fraction, init:Fraction, list:Fraction[]):Fraction
declare function divide(x: Fraction, y: Fraction):Fraction
declare function fraction( x: number|Fraction):Fraction
declare function fraction( x: number[]|Fraction[]):Fraction[]


/*
 * Types
 */
export type DotFraction = (u: Fraction[] , v: Fraction[] ) =>Fraction 
export type Projection = (u : Fraction[] | number[]) => (v : Fraction[] | number[]) => Fraction[]

/*
 * Functions
 */
export const dotFraction : DotFraction =
  (u, v) => reduce(add, fraction(0), zipWith(multiply, u, v))

/*
 * projection :: [a] => [a] => frac[a]
 * Projection of a vector
 * proj_u (v) := (<v,u>/<u,u>)*u
 * where <,> is dot product
 */
export const projection : Projection = (u) => (v) => {
  const U = fraction(u)
  const V = fraction(v)
  return isZeroVector(U) ? U : multiply(divide(dotFraction(U, V), dotFraction(U, U)), U)
}

