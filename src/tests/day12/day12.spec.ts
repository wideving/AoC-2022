import { solveDay12A } from '@/day12'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day12/test-input.txt'
const FULL_PATH = 'src/day12/full-input.txt'

describe('day12 A', () => {
  it('should correct result from test data', async () => {
    expect(await solveDay12A(PATH)).toEqual(31)
  })

  it('should correct result from full data', async () => {
    expect(await solveDay12A(FULL_PATH)).toEqual(426)
  })
})
