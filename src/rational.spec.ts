import {toQ, vecToQ, toN , vecToN, add, sub, mul, div, sqrt, square, numerator, denominator , inverse} from './rational'
import {equals,all, map} from 'ramda';
import {typeOf, round} from 'mathjs';


/*
 * helpers
 */
const equalsRound = (n: number) => (a: number | number[], b : number|number[]):boolean =>
  equals( round(a,n), round(b,n))
const equalsRound4 = equalsRound(4)

test('should return a rational number',()=>{
  expect(equals('Fraction' , typeOf(toQ(10)))).toBeTruthy()
})

test('should return a rational vector', ()=>{
  const vec = vecToQ([1,2,3,4,5])
  expect( all(equals('Fraction'))(map(typeOf, vec))).toBeTruthy()
})

test('should convert Q to number', ()=>{
  expect(equals(10, toN(toQ(10)))).toBeTruthy()
  expect(equals([10], vecToN(vecToQ([10])))).toBeTruthy()
})

test('the basic operations should work on rationals', ()=>{
  const [a,b] = [-10,10]
  const [qa, qb] = vecToQ([a,b])
  expect( toN(add(qa,qb)) ).toBe(a+b)
  expect( toN(mul(qa,qb)) ).toBe(a*b)
  expect( toN(div(qa,qb)) ).toBe(a/b)
  expect( toN(sub(qa,qb)) ).toBe(a-b)
})

test('unary operations', ()=>{
  // square
  expect(equalsRound4( toN(square(toQ(123.123))) , 123.123*123.123)).toBeTruthy()
  expect(equalsRound4( toN(square(toQ(-123.123))) , (-123.123)*(-123.123))).toBeTruthy()
  expect(equalsRound4( toN(square(toQ(0))) , 0)).toBeTruthy()

  // sqrt
  expect(equalsRound4( toN(sqrt(toQ(123.123))) , Math.sqrt(123.123))).toBeTruthy()
  expect(equalsRound4( toN(sqrt(toQ(0))) , 0)).toBeTruthy()

  // inverse
  expect( equalsRound4( toN(inverse(toQ(1))) , 1) ).toBeTruthy()
  expect( equalsRound4( toN(inverse(toQ(2))) , 1/2) ).toBeTruthy()
  expect( equalsRound4( toN(inverse(toQ(1/2))) , 2) ).toBeTruthy()
  expect( equalsRound4( toN(inverse(toQ(-1/2))) , -2) ).toBeTruthy()
  expect( ()=> inverse(toQ(0))).toThrowError("0 has no inverse!")
})

test('numerator and denominator', ()=>{
  const numbers = [ 1/2, 10, 123123/3453451 , -123, 0, 8/20 ]
  const num = map(numerator, numbers)
  const den = map(denominator, numbers)

  expect(equals(num, [1, 10, 123123, -123, 0, 2])).toBeTruthy()
  expect(equals(den, [2, 1, 3453451 , 1, 1, 5])).toBeTruthy()
})
