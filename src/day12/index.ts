import { dataLoader } from '@/utils/data-loader'
export interface Node {
  row: number
  col: number
  parent?: Node
}

export const solveDay12A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)

  const { grid, start, end } = parseToNumbers(data)
  const fullPath = bfs(grid, start, end).reverse()

  // revisit nodes and return count
  let node: Node | undefined = fullPath[0]
  let steps = 0
  while (node?.parent) {
    const next = fullPath.find(
      (n) => n.row === node?.parent?.row && n.col === node.parent?.col,
    )
    steps++
    node = next
  }
  return steps
}

export const solveDay12B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const { grid, starts, end } = parseToNumbersB(data)

  const completedPaths: Node[][] = []

  for (const start of starts) {
    completedPaths.push(bfs(grid, start, end).reverse())
  }

  const steps = completedPaths
    .map((nodes) => {
      return countSteps(nodes)
    })
    .filter((value) => value !== 0)
    .sort()
  return steps[0]
}

export const countSteps = (nodes: Node[]) => {
  // revisit nodes and return count
  let node: Node | undefined = nodes[0]
  let steps = 0
  while (node?.parent) {
    const next = nodes.find(
      (n) => n.row === node?.parent?.row && n.col === node.parent?.col,
    )
    steps++
    node = next
  }
  return steps
}

export const bfs = (grid: number[][], start: Node, end: Node): Node[] => {
  // create a queue for storing nodes to visit
  const queue: Node[] = []

  // create a set for storing visited nodes
  const visited = new Set<string>()

  // store the path, addding a parent to the node allows
  // us to backtrack and count the number of steps
  const path: Node[] = []

  // enqueue the starting node
  queue.push(start)

  // push to path
  path.push(start)

  visited.add(`${start.row},${start.col}`)
  // arrays for storing the row and column offsets
  const rowOffsets = [-1, 0, 1, 0]
  const colOffsets = [0, 1, 0, -1]
  // while there are nodes to visit
  while (queue.length > 0) {
    // dequeue the front node
    const node = queue.shift()!

    // if the node is the goal, return true
    if (node.row === end.row && node.col === end.col) {
      return path
    }

    // visit all of the node's neighbors
    for (let i = 0; i < rowOffsets.length; i++) {
      const neighborRow = node.row + rowOffsets[i]
      const neighborCol = node.col + colOffsets[i]

      // check if the neighbor is out of bounds or has been visited
      if (
        neighborRow < 0 ||
        neighborRow >= grid.length ||
        neighborCol < 0 ||
        neighborCol >= grid[0].length ||
        visited.has(`${neighborRow},${neighborCol}`)
      ) {
        continue
      }

      const currentHeight = grid[node.row][node.col]
      const neighbourHeight = grid[neighborRow][neighborCol]

      if (
        neighbourHeight <= currentHeight ||
        currentHeight + 1 === neighbourHeight
      ) {
        // mark the neighbor as visited and enqueue it
        visited.add(`${neighborRow},${neighborCol}`)
        queue.push({ row: neighborRow, col: neighborCol })
        path.push({ row: neighborRow, col: neighborCol, parent: node })
      }
    }
  }

  // if the goal was not reached, return empty array
  return []
}

export const parseToNumbersB = (
  data: string[],
): { grid: number[][]; starts: Node[]; end: Node } => {
  const startingPositions: Node[] = []
  let endPosition: Node

  return {
    grid: data.map((row, rowIndex) => {
      return row.split('').map((char, columnIndex) => {
        if (char === 'S') {
          startingPositions.push({ row: rowIndex, col: columnIndex })
          return 'a'.charCodeAt(0) - 97
        }

        if (char === 'a') {
          startingPositions.push({ row: rowIndex, col: columnIndex })
        }

        if (char === 'E') {
          endPosition = { row: rowIndex, col: columnIndex }
          return 'z'.charCodeAt(0) - 97
        }
        return Number(char.charCodeAt(0) - 97)
      })
    }),
    starts: startingPositions,
    end: endPosition!,
  }
}

export const parseToNumbers = (
  data: string[],
): { grid: number[][]; start: Node; end: Node } => {
  let startingPosition: Node
  let endPosition: Node

  return {
    grid: data.map((row, rowIndex) => {
      return row.split('').map((char, columnIndex) => {
        if (char === 'S') {
          startingPosition = { row: rowIndex, col: columnIndex }
          return 'a'.charCodeAt(0) - 97
        }

        if (char === 'E') {
          endPosition = { row: rowIndex, col: columnIndex }
          return 'z'.charCodeAt(0) - 97
        }
        return Number(char.charCodeAt(0) - 97)
      })
    }),
    start: startingPosition!,
    end: endPosition!,
  }
}
