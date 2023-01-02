import { doOperation, parseMonkeys, solveDay11A } from '@/day11'
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
    expect(parsedMonkeys[0]).toStrictEqual({
      id: 0,
      items: [79, 98],
      operation: ['old', '*', '19'],
      test: { amount: 23, isTrueThrowId: 2, isFalseThrowID: 3 },
      inspectionCount: 0,
    })
  })

  it('should calculate correct new worry level', () => {
    const worryLevel = doOperation(79, ['old', '*', '19'])
    expect(worryLevel).toEqual(500)
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay11A(PATH)).toEqual(10605)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay11A(FULL_PATH)).toEqual(112221)
  })
})
