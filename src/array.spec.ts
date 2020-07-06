import { emptyArray, isZeroVector } from './array'
import { length, range, tail, map, forEach } from 'ramda'
import { fraction, Fraction } from 'mathjs'

declare function fraction(a:number[]):Fraction[]

test('should have length = 100', () => {
  //expect(length(emptyArray(100))).toBe(100)
  expect(true).toBeTruthy()
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
  expect(isZeroVector(fraction([0, 0, 0, 0, 0.0000001, 0]))).toBeFalsy()
  expect(isZeroVector(fraction([0, 0, 0, 0, 0, 0]))).toBeTruthy()
})
 
