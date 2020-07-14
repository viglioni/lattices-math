import { equals, map, apply, unapply, forEach } from 'ramda'
import { projection, gramSchmidt } from './gram-schmidt'
import {vecToQ, Q, vecToN, matrixToN, matrixToQ} from './rational'
import {round, fraction} from 'mathjs'


/*
 * helpers
 */
const equalsRounded = (u: Q[] | number[] ,v: Q[] | number[]) =>
  equals(round(vecToN(u), 4) , round(vecToN(v), 4))
/*
 * tests
 */
test('should return 0 vector when u is 0', () => {
  const proj = projection([0, 0, 0, 0, 0])([1, 2, 3, 4, 5])
  expect(equals(proj, vecToQ([0, 0, 0, 0, 0]))).toBeTruthy()
})

test('should return correct values', () => {
  const testHelper = apply((u:number[], v:number[], result:number[]) => {
    expect(equalsRounded(projection(u)(v), vecToQ(result))).toBeTruthy()
  })

  const valuesToTest = [
    [
      [1, 2],
      [3, 4],
      [
        11/5,
        22/ 5,
      ],
    ],
    [
      [1, 2, -10, 15, 18],
      [33, 0, -12, 3, 4],
      [
        45/109,
        90/109,
        -450/109,
        675/109,
        810/109,
      ],
    ],
    [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    ],
    [
      [0.87, -0.99, 88, 0.12345],
      [1.1, 12, 13.1313, 888],
      [0.140877, -0.160309, 14.2497, 0.01999],
    ],
    [
      [-0.8887, -0.99, 0.7, -10.25],
      [0.1, 0.12, 0.00013, -0.0008],
      [0.00165099, 0.00183918, -0.00130043, 0.019042],
    ],
  ]

  forEach(testHelper, valuesToTest)
})

test('Gram-Schmidt process', ()=>{

  const testHelper = apply((matrix: number[][], result: number[][]) => {
    const out = round(matrixToN(gramSchmidt(matrix)), 4)
    const expected = round(result, 4)
    expect( equals(out, expected) ).toBeTruthy()
  })

  const matrixes = [
    [
      [ [ 3, 1 ], [ 2, 2 ] ],
      [ [3/Math.sqrt(10),1/Math.sqrt(10)] , [-1/Math.sqrt(10) , 3/Math.sqrt(10)]]
    ],
    [
      [[1,2,3] , [4,5,6] , [0,0,0]],
      [
        [1/Math.sqrt(14) , Math.sqrt(2/7) , 3/Math.sqrt(14)],
        [4/Math.sqrt(21) , 1/Math.sqrt(21), -2/Math.sqrt(21) ],
        [0,0,0]
      ]
    ],
    [
      [[0.1, -0.02] , [2.3, -0.1]],
      [ [0.980581, -0.196116], [0.196116, 0.980581]]
    ]
  ]

  forEach(testHelper , matrixes)
})
