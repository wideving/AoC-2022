import {
  parseToNumbers,
  parseToNumbersB,
  solveDay12A,
  solveDay12B,
} from '@/day12'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day12/test-input.txt'
const FULL_PATH = 'src/day12/full-input.txt'

describe('day12 A', () => {
  it('should correct result from test data', async () => {
    expect(await solveDay12A(PATH)).toEqual(31)
  })

  it('should parse to numbers', () => {
    expect(parseToNumbers(['SaE'])).toStrictEqual({
      grid: [[0, 0, 25]],
      start: { row: 0, col: 0 },
      end: { row: 0, col: 2 },
    })
  })

  it('should correct result from full data', async () => {
    expect(await solveDay12A(FULL_PATH)).toEqual(426)
  })
})

describe('day12 B', () => {
  it('should correct result from test data', async () => {
    expect(await solveDay12B(PATH)).toEqual(29)
  })

  it('should correct result from full data', async () => {
    expect(await solveDay12B(FULL_PATH)).toEqual(419)
  })

  it('should return the correct starting points', () => {
    expect(parseToNumbersB(['SaE'])).toStrictEqual({
      grid: [[0, 0, 25]],
      starts: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      end: { row: 0, col: 2 },
    })
  })
})
