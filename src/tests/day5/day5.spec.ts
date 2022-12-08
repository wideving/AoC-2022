import {
  addBoxesToArray,
  addEmptyBoxes,
  columnCount,
  getAllBoxes,
  getMoveInstructions,
  reverseBoxes,
  solveDay5A,
  solveDay5B,
} from '@/day5'
import { dataLoader } from '@/utils/data-loader'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day5/test-input.txt'
const FULL_PATH = 'src/day5/full-input.txt'

describe('day5 A', () => {
  it('should be defined', async () => {
    expect(solveDay5A).toBeDefined()
  })

  it('should add boxes in correct order to array', () => {
    const arr = ['[-][D]', '[N][C]', '[Z][M][P]']
    const result = addBoxesToArray(arr)
    expect(result[0]).toEqual(['[Z]', '[N]'])
    expect(result[1]).toEqual(['[M]', '[C]', '[D]'])
    expect(result[2]).toEqual(['[P]'])
  })

  it('should add empty box on 4 spaces', () => {
    expect(addEmptyBoxes('        [Z]')).toEqual('[-][-][Z]')
    expect(addEmptyBoxes('[Z]        ')).toEqual('[Z][-][-]')
    expect(addEmptyBoxes('    [Z]    ')).toEqual('[-][Z][-]')
  })

  it('should return all boxes', async () => {
    const data = await dataLoader(PATH)
    expect(getAllBoxes(data)).toHaveLength(3)
    expect(getAllBoxes(data)[0]).toStrictEqual('    [D]')
    expect(getAllBoxes(data)[1]).toStrictEqual('[N] [C]')
    expect(getAllBoxes(data)[2]).toStrictEqual('[Z] [M] [P]')
  })

  it('should get move instructions', () => {
    const order = getMoveInstructions([
      'move 11 from 1 to 7',
      'move 5 from 11 to 17',
    ])
    expect(order).toStrictEqual([
      { amount: 11, from: 0, to: 6 },
      { amount: 5, from: 10, to: 16 },
    ])
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay5A(PATH)).toEqual('CMZ')
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay5A(FULL_PATH)).toEqual('TLNGFGMFN')
  })
})

describe('day5 B', () => {
  it('should be defined', async () => {
    expect(solveDay5B).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay5B(PATH)).toEqual('MCD')
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay5B(FULL_PATH)).toEqual('FGLQJCMBD')
  })
})
