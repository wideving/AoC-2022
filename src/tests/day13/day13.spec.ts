import {
  amountOfEmpties,
  compare,
  isEmpty,
  parsePacket,
  parseToPackagePairs,
  solveDay13A,
} from '@/day13'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day13/test-input.txt'
const FULL_PATH = 'src/day13/full-input.txt'

describe('day13 A', () => {
  it('should correct result from test data', async () => {
    expect(await solveDay13A(PATH)).toEqual(13)
  })
  it('should correct result from full data', async () => {
    expect(await solveDay13A(FULL_PATH)).toEqual(6046)
  })

  it('should parse to pairs', () => {
    expect(
      parseToPackagePairs([
        '[1,1,3,1,1]',
        '[1,1,5,1,1]',
        '',
        '[1, [2], 3]',
        '[[]]',
      ]),
    ).toEqual([
      {
        left: [1, 1, 3, 1, 1],
        right: [1, 1, 5, 1, 1],
      },
      {
        left: [1, [2], 3],
        right: [[]],
      },
    ])
  })

  it('should compare two packets', () => {
    expect(compare([], [])).toEqual(undefined)
    expect(compare([[1, 2], 4], [[1], 5, 5])).toEqual(false)
    expect(compare([[1, 2], 4], [[[3]], 5, 5])).toEqual(true)
    expect(compare([[8]], [8])).toEqual(undefined)
    expect(compare([[8, [[7]]]], [[[[8]]]])).toEqual(false)
    expect(compare([5, 2], [[4], 3])).toEqual(false)
    expect(compare([[]], [])).toEqual(false)
    expect(compare([], [[]])).toEqual(true)
    expect(compare([[]], [[]])).toEqual(undefined)
    expect(compare([[], []], [[]])).toEqual(false)
    expect(compare([[], []], [[], [], []])).toEqual(true)
    expect(compare([[], [1, 2], 1], [[], [1], 2])).toEqual(false)
    expect(
      compare(
        [
          [
            [[7], [2, 5], [4, 1, 10, 9]],
            [[], [6, 0, 2, 1], [0], [7, 0], 9],
            8,
            [6],
            9,
          ],
          [4, [], []],
          [2],
        ],
        [[7], [[6, 6]]],
      ),
    ).toEqual(false)
    expect(
      compare(
        [[1, [2, [10, 8, 2, 1, 1]], 0]],
        [
          [[1]],
          [[[2, 4, 10, 2], []], 3, 8],
          [
            9,
            3,
            [5, [3, 0], [0], [4]],
            6,
            [[9, 8, 3, 7], 4, [10, 10, 8], 10, [6, 6]],
          ],
          [[[3], 7, [], [10, 5]], 0],
          [5, [[3, 9, 0, 2, 1], 0, [4, 5, 2], [6]]],
        ],
      ),
    ).toEqual(false)
  })

  it('should parse a packet', () => {
    expect(parsePacket('[1,[2,[3,[4,[5,6,7]]]],8,9]')).toEqual([
      1,
      [2, [3, [4, [5, 6, 7]]]],
      8,
      9,
    ])
    expect(parsePacket('[[[]]]')).toEqual([[[]]])
  })
})
