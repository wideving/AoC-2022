import { dataLoader } from '@/utils/data-loader'

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
  if (rowIndex === 0 || rowIndex === grid.length - 1) {
    return true
  }
  const column = grid.map((row) => row[columnIndex])
  const treeHeight = column[rowIndex]
  const left = Math.max(...column.slice(0, rowIndex)) < treeHeight
  const right = Math.max(...column.slice(rowIndex + 1)) < treeHeight
  return left || right
}

export const getGrid = (data: string[]): number[][] =>
  data.map((row) => row.split('').map((char) => Number(char)))
