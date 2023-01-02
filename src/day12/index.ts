import { dataLoader } from '@/utils/data-loader'

export const solveDay12A = async (path: string) => {
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
    console.log(node)
  }
  return steps
}

export interface Node {
  row: number
  col: number
  parent?: Node
}

export const bfs = (grid: number[][], start: Node, end: Node): Node[] => {
  // create a queue for storing nodes to visit
  const queue: Node[] = []

  // create a set for storing visited nodes
  const visited = new Set<string>()

  const path: Node[] = []

  // enqueue the starting node
  queue.push(start)
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
