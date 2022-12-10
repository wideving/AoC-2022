import {
  findUniqueMarker,
  findUniqueMarkerIndex,
  solveDay6A,
  solveDay6B,
} from '@/day6'
import { dataLoader } from '@/utils/data-loader'
import { describe, expect, it } from 'vitest'
import { t } from 'vitest/dist/index-9f5bc072'

const PATH = 'src/day6/test-input.txt'
const FULL_PATH = 'src/day6/full-input.txt'

describe('day6 A', () => {
  it('should be defined', async () => {
    expect(solveDay6A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay6A(PATH)).toEqual(5)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay6A(FULL_PATH)).toEqual(1210)
  })

  it('should find unique marker', () => {
    expect(findUniqueMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe('jpqm')
  })

  it('should find unique marker start index', () => {
    expect(
      findUniqueMarkerIndex(
        findUniqueMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')!,
        'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
      ),
    ).toEqual(7)
  })
})

describe('day6 B', () => {
  it('should be defined', async () => {
    expect(solveDay6B).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay6B(PATH)).toEqual(23)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay6B(FULL_PATH)).toEqual(3476)
  })
})
