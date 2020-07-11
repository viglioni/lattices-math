import { emptyVector, isZeroVector , dot} from './vector'
import { length, range, tail, map, forEach, equals } from 'ramda'
import {vecToQ, toN, toQ} from './rational'
import { round } from 'mathjs'

const equalsRound2 = (a: number, b : number):boolean =>  equals( round(a,2), round(b,2))

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
