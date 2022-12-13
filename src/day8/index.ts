import { dataLoader } from '@/utils/data-loader'

export const solveDay8B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const grid = getGrid(data)
  let highestScore = 0
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < grid[rowIndex].length;
      columnIndex++
    ) {
      const left = leftScore(grid[rowIndex], columnIndex)
      const right = rightScore(grid[rowIndex], columnIndex)
      const top = topScore(grid, rowIndex, columnIndex)
      const bottom = bottomScore(grid, rowIndex, columnIndex)

      const score = left * right * bottom * top

      if (score > highestScore) {
        highestScore = score
      }
    }
  }

  return highestScore
}

export const bottomScore = (
  grid: number[][],
  rowIndex: number,
  columnIndex: number,
) => {
  if (rowIndex === grid.length - 1) {
    return 0
  }

  const row = grid.map((row) => row[columnIndex])
  const treeHeight = row[rowIndex]
  const bottomSide = row.slice(rowIndex + 1)

  let points = 0

  for (const tree of bottomSide) {
    points += 1
    if (tree >= treeHeight) {
      break
    }
  }
  return points
}

export const topScore = (
  grid: number[][],
  rowIndex: number,
  columnIndex: number,
) => {
  if (rowIndex === 0) {
    return 0
  }

  const row = grid.map((row) => row[columnIndex])
  const treeHeight = row[rowIndex]
  const topSide = row.slice(0, rowIndex).reverse()

  let points = 0
  for (const tree of topSide) {
    points += 1
    if (tree >= treeHeight) {
      break
    }
  }

  return points
}

export const leftScore = (row: number[], treeIndex: number) => {
  if (treeIndex === 0) {
    return 0
  }

  const treeHeight = row[treeIndex]
  const leftSide = row.slice(0, treeIndex).reverse()
  let points = 0
  for (const tree of leftSide) {
    points += 1
    if (tree >= treeHeight) {
      break
    }
  }
  return points
}

export const rightScore = (row: number[], treeIndex: number) => {
  if (treeIndex === row.length - 1) {
    return 0
  }

  const treeHeight = row[treeIndex]
  const rightSide = row.slice(treeIndex + 1)
  let points = 0
  for (const tree of rightSide) {
    points += 1
    if (tree >= treeHeight) {
      break
    }
  }
  return points
}

export const solveDay8A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const grid = getGrid(data)

  // sum up all trees in the grid
  return grid.reduce((acc, row, rowIndex) => {
    return (
      acc +
      row.reduce((acc, _, columnIndex) => {
        return (
          acc +
          (isVisibleHorizontal(row, columnIndex) ||
          isVisibleVertical(grid, rowIndex, columnIndex)
            ? 1
            : 0)
        )
      }, 0)
    )
  }, 0)
}

export const isVisibleHorizontal = (
  row: number[],
  treeIndex: number,
): boolean => {
  if (treeIndex === 0 || treeIndex === row.length - 1) {
    return true
  }
  const treeHeight = row[treeIndex]
  const left = Math.max(...row.slice(0, treeIndex)) < treeHeight
  const right = Math.max(...row.slice(treeIndex + 1)) < treeHeight
  return left || right
}

export const isVisibleVertical = (
  grid: number[][],
  rowIndex: number,
  columnIndex: number,
): boolean => {
  if (columnIndex === 0 || columnIndex === grid.length - 1) {
    return true
  }
  const column = grid.map((row) => row[columnIndex])
  const treeHeight = column[rowIndex]
  const up = Math.max(...column.slice(0, rowIndex)) < treeHeight
  const down = Math.max(...column.slice(rowIndex + 1)) < treeHeight
  return up || down
}

export const getGrid = (data: string[]): number[][] =>
  data.map((row) => row.split('').map((char) => Number(char)))
