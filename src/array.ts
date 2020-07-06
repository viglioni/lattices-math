import { all, equals, compose, identity, map } from 'ramda'
import {number as numberfy, Fraction} from 'mathjs'



export const emptyArray = (n : number) : string[]  => Array(n).fill('')

/*
 * isZeroVector :: [integer | rational] => bool
 */
const _isZero = (n : number | Fraction ) : boolean => equals(numberfy(n) ,  0)
const _truthy = (a: boolean) : boolean => identity(a)
export const isZeroVector  = compose(all(_truthy),map(_isZero))

