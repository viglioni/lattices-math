import { emptyVector, isZeroVector , dot, vecSum, vecAdd, vecMul, vecDiv, vecSub, vecSquare, normalize, norm} from './vector'
import {zipWith,  length, range, tail, map, forEach, equals } from 'ramda'
import {vecToQ, toN, vecToN} from './rational'
import { round } from 'mathjs'

const equalsRound = (n: number) => (a: number | number[], b : number|number[]):boolean =>
  equals( round(a,n), round(b,n))
const equalsRound2 = equalsRound(2)
const equalsRound4 = equalsRound(4)

test('should have length = 100', () => {
  expect(length(emptyVector(100))).toBe(100)
})

test('should return true to any n-dim zero vector', () => {
  const dimentions = tail(range(0, 100))
  const nullVecs = map((dim) => Array(dim).fill(0), dimentions)
  forEach((vec) => {
    expect(isZeroVector(vec)).toBeTruthy()
  }, nullVecs)
})


test('should return false on a non-zero vec', () => {
  expect(isZeroVector([0, 0, 0, 0, 1, 0])).toBeFalsy()
})

test('should work if the vector is rational', () => {
  expect(isZeroVector(vecToQ([0, 0, 0, 0, 0.0000001, 0]))).toBeFalsy()
  expect(isZeroVector(vecToQ([0, 0, 0, 0, 0, 0]))).toBeTruthy()
})

test('dot should return zero if u or v is zero', ()=>{
  expect(toN( dot( vecToQ([1,2,3,4,5]) , vecToQ([0,0,0,0,0])))).toBe(0)
})

test('dot product should return the correct value', ()=>{
  const u = vecToQ([10, 5.5, 2, -20, 123, 98.123213 ])
  const v = vecToQ([0, 44, -0.123, 22, 0.001, 33])
  const result = 3039.94
  expect(equalsRound2( toN(dot(u,v)), result)).toBe(true)
})

test('Binary operations on vectors', ()=>{
  const u = [0,1,1.5,2]
  const v = [1,2,3,4.5]
  const U = vecToQ(u)
  const V = vecToQ(v)
  const resAdd = vecToQ(zipWith((a: number,b: number)=>a+b, u,v))
  const resMul = vecToQ(zipWith((a: number,b: number)=>a*b, u,v))
  const resSub = vecToQ(zipWith((a: number,b: number)=>a-b, u,v))
  const resDiv = vecToQ(zipWith((a: number,b: number)=>a/b, u,v))
  expect(equals(vecAdd(U,V) , resAdd)).toBeTruthy()
  expect(equals(vecMul(U,V) , resMul)).toBeTruthy()
  expect(equals(vecDiv(U,V) , resDiv)).toBeTruthy()
  expect(equals(vecSub(U,V) , resSub)).toBeTruthy()
})

test('Summation on vectors' , ()=>{
  const u = vecToQ([0,1,1.5,2])
  const v = vecToQ([1,2,3,4.5])
  const w = vecToQ([-1,-1,-1,-1])
  const z = vecToQ([-0.1, 0.1, -0.01,10])
  const result = vecToQ([-0.1, 2.1, 3.49, 15.5])
  expect(equals( vecSum([u,v,w,z]) , result)).toBeTruthy()
})

test('check dimentions', ()=>{
  const u = vecToQ([1,2,3])
  const v = vecToQ([1,2])
  expect( equals(vecAdd(u,[]),u )).toBeTruthy()
  expect( equals(vecAdd([],u),u )).toBeTruthy()
  expect(()=> vecAdd(u,v)).toThrowError("vectors must have same length!")
})

test('norm', ()=>{
  expect(equalsRound4(toN(norm(vecToQ([1,2,3,4,5,6,7,8]))), 14.2829)).toBeTruthy()
  expect(equalsRound4(toN(norm(vecToQ([0,0,0,0]))), 0)).toBeTruthy()
})

test('unary operators', ()=>{
  const u = vecToQ([1,2,3,4,5,6,7,8])
  const result = [1/(2*Math.sqrt(51)), 1/Math.sqrt(51), Math.sqrt(3/17)/2, 2/Math.sqrt(51), 5/(2*Math.sqrt(51)), Math.sqrt(3/17), 7/(2*Math.sqrt(51)), 4/Math.sqrt(51)]
  expect(equalsRound4(vecToN(normalize(u)), result)).toBeTruthy()
  expect(equals(vecSquare(u) , vecToQ([1,4,9,16,25,36,49,64]))).toBeTruthy()
})
