import {
  Direction,
  getAdjacentCoordinates,
  getTailMovements,
  isAdjacent,
  parseHeadMovement,
  parseMove,
  Point,
  solveDay9A,
} from '@/day9'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day9/test-input.txt'
const FULL_PATH = 'src/day9/full-input.txt'

describe('day9 A', () => {
  it('should be defined', () => {
    expect(solveDay9A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay9A(PATH)).toEqual(13)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay9A(FULL_PATH)).toEqual(5874)
  })

  it('should return true if adjacent false otherwise', () => {
    expect(isAdjacent({ x: 0, y: 0 }, { x: 0, y: 1 })).toBeTruthy()
    expect(isAdjacent({ x: 0, y: 0 }, { x: 0, y: 2 })).toBeFalsy()
    expect(isAdjacent({ x: 0, y: 0 }, { x: -1, y: 1 })).toBeTruthy()
  })

  it('should return adjacent coordinates', () => {
    const adjacentCoordinates = getAdjacentCoordinates({ x: 0, y: 0 })
    expect(adjacentCoordinates).toStrictEqual([
      { x: -1, y: 0 }, // left
      { x: -1, y: 1 }, // top left
      { x: 0, y: 1 }, // top
      { x: 1, y: 1 }, // top right
      { x: 1, y: 0 }, // right
      { x: 1, y: -1 }, // bottom right
      { x: 0, y: -1 }, // bottom
      { x: -1, y: -1 }, // bottom left
      { x: 0, y: 0 }, // center
    ])
  })

  it('should parse a row to a correct move', () => {
    expect(parseMove('R 5')).toEqual({ direction: Direction.RIGHT, steps: 5 })
    expect(parseMove('U 3')).toEqual({ direction: Direction.UP, steps: 3 })
    expect(parseMove('L 1')).toEqual({ direction: Direction.LEFT, steps: 1 })
    expect(parseMove('D 4')).toEqual({ direction: Direction.DOWN, steps: 4 })
  })

  it('should make a series of coordinates of a move', () => {
    const move1 = parseMove('R 3')
    const initialCoordinates: Point[] = [{ x: 0, y: 0 }]
    parseHeadMovement(move1, initialCoordinates)
    expect(initialCoordinates).toStrictEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ])

    const move2 = parseMove('U 2')
    parseHeadMovement(move2, initialCoordinates)
    expect(initialCoordinates).toStrictEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ])
  })
})
