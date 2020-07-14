import {sqrt as mSqrt, fraction, Fraction, typeOf, number as numberfy, add as addMathjs, multiply, divide, subtract, format} from 'mathjs';
import {replace, map, equals} from 'ramda';

/*
 * Types
 */
export type Q = Fraction
export type BinaryQ = (a: Q, b: Q) => Q
export type UnaryQ = (a: Q) => Q

/*
 * Check if is rational
 */
export const inQ = ( n : unknown) : n is Q => equals('Fraction', typeOf(n))


/*
 * Converts number to rational (Q)
 */
export const toQ = (n: number | Q) : Q => inQ(n) ? n : fraction(n) as Q

/*
 * converts a number vector into a rational one
 */
export const vecToQ : (arr: number[] | Q[])=>Q[] =  map(toQ)

/*
 * converts type Q to number
 */
export const toN = (n : number | Q ) => inQ(n) ? numberfy(n) as number : n

/*
 * converts Q[] to number[]
 */
export const vecToN : (v: number[] | Q[] )=>number[] = map(toN)

/*
 * Default binary operations on Q
 */
export const add : BinaryQ = (a,b) => addMathjs(a,b) as Q
export const div : BinaryQ = (a,b) => divide(a,b) as Q
export const mul : BinaryQ = (a,b) => multiply(a,b) as Q
export const sub : BinaryQ = (a,b) => subtract(a,b) as Q

/*
 * Default unary operations on Q 
 */
export const square : UnaryQ = (u) => mul(u,u)
export const sqrt : UnaryQ = (u) => {
  const num = mSqrt(numerator(u))
  const den = mSqrt(denominator(u))
  return toQ(num/den)
}
export const inverse : UnaryQ = u => {
  if( equals(u, toQ(0))) throw new Error("0 has no inverse!")
  else return toQ(denominator(u)/ numerator(u))
}


/*
 * Converts a matrix to a rational one
 */
export const matrixToQ = map(vecToQ)

/*
 * Converts a matrix to number
 */
export const matrixToN = map(vecToN)

/*
 * Numerator and Denominator of a fraction
 */
const getNandD = (n: number | Q) => {
  const q = format(toQ(n))
  const numerator = numberfy(replace(/\/.*/, '', q)) as number
  const denominator = numberfy(replace(/.*\//, '', q)) as number
  return {numerator, denominator}
}
export const numerator = (n: number | Q) => getNandD(n).numerator
export const denominator = (n: number | Q) => getNandD(n).denominator

