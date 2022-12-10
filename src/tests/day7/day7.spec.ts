import { solveDay7A } from '@/day7'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day7/test-input.txt'
const FULL_PATH = 'src/day7/full-input.txt'

describe('day7 A', () => {
  it('should be defined', async () => {
    expect(solveDay7A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay7A(PATH)).toEqual(5)
  })
})

// describe('day7 B', () => {
//   it('should be defined', async () => {
//     expect(solveDay6B).toBeDefined()
//   })

//   it('should return correct result from test data', async () => {
//     expect(await solveDay7B(PATH)).toEqual(23)
//   })

//   it('should return correct result from full data', async () => {
//     expect(await solveDay7B(FULL_PATH)).toEqual(3476)
//   })
// })
