import {toQ, vecToQ, toN , vecToN, add, sub, mul, div } from './rational'
import {equals,all, map} from 'ramda';
import {typeOf} from 'mathjs';

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
