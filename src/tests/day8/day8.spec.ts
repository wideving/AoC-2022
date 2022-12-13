import {
  bottomScore,
  getGrid,
  isVisibleHorizontal,
  isVisibleVertical,
  leftScore,
  rightScore,
  solveDay8A,
  solveDay8B,
  topScore,
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
    expect(isVisibleHorizontal([1, 2, 3], 0)).toBeTruthy()
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

describe('day8 B', () => {
  it('should be defined', async () => {
    expect(solveDay8B).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay8B(PATH)).toEqual(8)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay8B(FULL_PATH)).toEqual(201684)
  })

  it('should return left side score', () => {
    const row = [0, 4, 3, 3, 3, 6, 7, 8]

    expect(leftScore(row, 0)).toEqual(0)
    expect(leftScore(row, 1)).toEqual(1)
    expect(leftScore(row, 2)).toEqual(1)
    expect(leftScore(row, 4)).toEqual(1)
    expect(leftScore(row, 5)).toEqual(5)
    expect(leftScore(row, 6)).toEqual(6)
    expect(leftScore(row, 7)).toEqual(7)
  })

  it('should return top side score', () => {
    const grid = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    expect(topScore(grid, 2, 3)).toEqual(2)
    expect(topScore(grid, 0, 0)).toEqual(0)
    expect(topScore(grid, 4, 4)).toEqual(1)
  })

  it('should return bottom side score', () => {
    const grid = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    expect(bottomScore(grid, 2, 3)).toEqual(1)
    expect(bottomScore(grid, 4, 0)).toEqual(0)
  })

  it('should return right side score', () => {
    const grid = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    expect(rightScore(grid[1], 1)).toEqual(1)
  })
})
