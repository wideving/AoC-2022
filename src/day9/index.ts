import { dataLoader } from '@/utils/data-loader'

export interface Point {
  x: number
  y: number
}

export enum Direction {
  LEFT,
  UP,
  RIGHT,
  DOWN,
}

export interface Sum {
  tailMovements: Point[]
  wasAdjacent: boolean
}

export interface Move {
  direction: Direction
  steps: number
}

export const solveDay9A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const moves = data.map(parseMove)

  const headMovements = moves.reduce((acc, curr) => {
    parseHeadMovement(curr, acc)
    return acc
  }, new Array<Point>({ x: 0, y: 0 }))

  const tailMovements = getTailMovements(headMovements)

  return getUniqueMovements(tailMovements).length
}

export const getUniqueMovements = (tailMovements: Point[]) => {
  const uniqueMovements: Point[] = []

  for (const move of tailMovements) {
    if (
      !uniqueMovements.find(
        (uniqueMove) => uniqueMove.x === move.x && uniqueMove.y === move.y,
      )
    ) {
      uniqueMovements.push(move)
    }
  }

  return uniqueMovements
}

export const getTailMovements = (headMovements: Point[]): Point[] => {
  const sum: Sum = headMovements.reduce(
    (sum, headMove, index) => {
      const lastTailMove = sum.tailMovements[sum.tailMovements.length - 1]

      if (isAdjacent(lastTailMove, headMove)) {
        sum.wasAdjacent = true
        return sum
      }

      sum.tailMovements.push(headMovements[index - 1])
      sum.wasAdjacent = false

      return sum
    },
    {
      tailMovements: new Array<Point>({ x: 0, y: 0 }),
      wasAdjacent: false,
    } as Sum,
  )
  return sum.tailMovements
}

export const isAdjacent = (tail: Point, head: Point) => {
  const adjacentCoordinates = getAdjacentCoordinates(tail)
  return (
    adjacentCoordinates.filter((coordinates) => {
      return head.x === coordinates.x && head.y === coordinates.y
    }).length > 0
  )
}

export const getAdjacentCoordinates = (point: Point): Point[] => {
  return [
    { x: point.x - 1, y: point.y }, // left
    { x: point.x - 1, y: point.y + 1 }, // top left
    { x: point.x, y: point.y + 1 }, // top
    { x: point.x + 1, y: point.y + 1 }, // top right
    { x: point.x + 1, y: point.y }, // right
    { x: point.x + 1, y: point.y - 1 }, // bottom right
    { x: point.x, y: point.y - 1 }, // bottom
    { x: point.x - 1, y: point.y - 1 }, // bottom left
    { x: point.x, y: point.y }, // center
  ]
}

export const parseHeadMovement = (move: Move, coordinates: Point[]) => {
  for (let i = 0; i < move.steps; i++) {
    const last = coordinates[coordinates.length - 1] // get the last move

    switch (move.direction) {
      case Direction.UP:
        coordinates.push({ x: last.x, y: last.y + 1 })
        break
      case Direction.DOWN:
        coordinates.push({ x: last.x, y: last.y - 1 })
        break
      case Direction.LEFT:
        coordinates.push({ x: last.x - 1, y: last.y })
        break
      case Direction.RIGHT:
        coordinates.push({ x: last.x + 1, y: last.y })
        break
    }
  }
}

export const parseMove = (row: string): Move => {
  const [dir, steps] = row.split(' ')
  let direction: Direction
  switch (dir) {
    case 'U': {
      direction = Direction.UP
      break
    }
    case 'L': {
      direction = Direction.LEFT
      break
    }
    case 'D': {
      direction = Direction.DOWN
      break
    }
    case 'R': {
      direction = Direction.RIGHT
      break
    }
    default: {
      throw Error('Not possible')
    }
  }
  return {
    direction,
    steps: Number(steps),
  }
}
