import { parseMonkeys, solveDay11A } from '@/day11'
import { dataLoader } from '@/utils/data-loader'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day11/test-input.txt'
const FULL_PATH = 'src/day11/full-input.txt'

describe('day11 A', () => {
  it('should be defined', () => {
    expect(solveDay11A).toBeDefined()
  })

  it('should parse monkeys', async () => {
    const parsedMonkeys = parseMonkeys(await dataLoader(PATH))
  })

  // it('should return correct result from test data', async () => {
  //   expect(await solveDay11A(PATH)).toEqual(0)
  // })
})
