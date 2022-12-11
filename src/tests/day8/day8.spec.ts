import {
  getGrid,
  isVisibleHorizontal,
  isVisibleVertical,
  solveDay8A,
} from '@/day8'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day8/test-input.txt'
const FULL_PATH = 'src/day8/full-input.txt'

describe('day8 A', () => {
  it('should be defined', () => {
    expect(solveDay8A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay8A(PATH)).toEqual(21)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay8A(FULL_PATH)).toEqual(1681)
  })

  it('should return number grid', () => {
    expect(getGrid(['123', '321'])).toEqual([
      [1, 2, 3],
      [3, 2, 1],
    ])
  })

  it('should be return visibility horizontal', () => {
    // expect(isVisibleHorizontal([1, 2, 3], 0)).toBeTruthy()
    expect(isVisibleHorizontal([2, 2, 2, 2], 1)).toBeFalsy()
    expect(isVisibleHorizontal([2, 2, 3, 2], 2)).toBeTruthy()
    expect(isVisibleHorizontal([2, 2, 2, 1], 3)).toBeTruthy()
  })

  it('should be return visibility vertical', () => {
    const grid = [
      [1, 1, 5, 1],
      [1, 2, 9, 1],
      [1, 1, 8, 1],
    ]
    expect(isVisibleVertical(grid, 0, 1)).toBeTruthy()
    expect(isVisibleVertical(grid, 1, 1)).toBeTruthy()
    expect(isVisibleVertical(grid, 1, 2)).toBeTruthy()
  })
})

// describe('day8 B', () => {
//   it('should be defined', async () => {
//     expect(solveDay8B).toBeDefined()
//   })
// })
