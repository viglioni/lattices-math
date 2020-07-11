import { genIntBasis } from './basis'
import { det as determinant, size } from 'mathjs'
import { equals } from 'ramda'

test('should return a 100x100 non-singular matrix', () => {
  const basis = genIntBasis(100)
  expect(determinant(basis)).not.toBe(0)
  expect(equals(size(basis).valueOf(), [100, 100])).toBeTruthy()
})
