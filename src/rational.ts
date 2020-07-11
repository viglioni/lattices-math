import {fraction, Fraction, typeOf, number as numberfy, add as addMathjs, multiply, divide, subtract} from 'mathjs';
import {map, equals} from 'ramda';

/*
 * Types
 */
export type Q = Fraction
export type BinaryQ = (a: Q, b: Q) => Q

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
export const toN = (n : number | Q) => inQ(n) ? numberfy(n) as number : n

/*
 * converts Q[] to number[]
 */
export const vecToN : (v: number[] | Q[])=>number[] = map(toN)

/*
 * Default binary operations on Q
 */
export const add : BinaryQ = (a,b) => addMathjs(a,b) as Q
export const div : BinaryQ = (a,b) => divide(a,b) as Q
export const mul : BinaryQ = (a,b) => multiply(a,b) as Q
export const sub : BinaryQ = (a,b) => subtract(a,b) as Q
