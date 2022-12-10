import { dataLoader } from '@/utils/data-loader'

export const solveDay6A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)

  return findUniqueMarkerIndex(findUniqueMarker(data[0])!, data[0])
}

export const solveDay6B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)

  return findUniqueMarkerIndex(findUniqueMarker(data[0], 14)!, data[0], 14)
}

export const findUniqueMarker = (
  sequence: string,
  length = 4,
): string | null => {
  for (let i = length; i < sequence.length; i++) {
    const result = sequence
      .substring(i, i - length)
      .split('')
      .reduce((acc, curr) => {
        acc.has(curr) ? acc.set(curr, acc.get(curr)! + 1) : acc.set(curr, 1)
        return acc
      }, new Map<string, number>())
    if (result.size === length) {
      return Array.from(result.keys()).join('')
    }
  }
  return null
}

export const findUniqueMarkerIndex = (
  marker: string,
  sequence: string,
  length = 4,
): number => {
  return sequence.indexOf(marker) + length
}
