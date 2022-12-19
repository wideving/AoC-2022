import { parseInstructions, solveDay10A } from '@/day10'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day10/test-input.txt'
const FULL_PATH = 'src/day10/full-input.txt'

describe('day10 A', () => {
  it('should be defined', () => {
    expect(solveDay10A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay10A(PATH)).toEqual(13140)
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay10A(FULL_PATH)).toEqual(14520)
  })

  it('should parse rows to instrcutions', () => {
    expect(parseInstructions('addx -15')).toStrictEqual({
      type: 'addx',
      cycles: 2,
      value: -15,
    })
    expect(parseInstructions('noop')).toStrictEqual({
      type: 'noop',
      cycles: 1,
      value: 0,
    })
    expect(parseInstructions('addx 10')).toStrictEqual({
      type: 'addx',
      cycles: 2,
      value: 10,
    })
  })
})
