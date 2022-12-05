import {
  calculatePriorities,
  findCommonBadge,
  findDuplicate,
  pairOf3,
  solveDay3A,
  solveDay3B,
  splitItemsInTwo,
} from '@/day3'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day3/test-input.txt'
const FULL_PATH = 'src/day3/full-input.txt'

describe('day2 A', () => {
  it('should be defined', async () => {
    expect(solveDay3A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay3A(PATH)).toEqual(157)
  })

  it('should return correct result from full test data', async () => {
    expect(await solveDay3A(FULL_PATH)).toEqual(8349)
  })

  it('should split items to two rucksacks', () => {
    const test = 'aaabbb'
    const rucksacks = splitItemsInTwo(test)
    expect(rucksacks).toHaveLength(2)
    expect(rucksacks[0]).toBe('aaa')
    expect(rucksacks[1]).toBe('bbb')
  })

  it('should return duplicate item', () => {
    const [one, two] = splitItemsInTwo('vJrwpWtwJgWrhcsFMMfFFhFp')
    expect(findDuplicate(one, two)).toEqual('p')
  })

  it('should return correct priority score', () => {
    expect(calculatePriorities('a')).toEqual(1)
    expect(calculatePriorities('A')).toEqual(27)
  })
})

describe('day3 B', () => {
  it('should return pair of 3', () => {
    const test = ['a', 'b', 'c', 'd', 'e', 'f']
    const pairs = pairOf3(test)
    expect(pairs).toStrictEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ])
  })

  it('should find common badge b', () => {
    const test = ['abc', 'bde', 'fbg']
    expect(findCommonBadge(test)).toEqual('b')
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay3B(PATH)).toEqual(70)
  })

  it('should return correct result from full test data', async () => {
    expect(await solveDay3B(FULL_PATH)).toEqual(2681)
  })
})
