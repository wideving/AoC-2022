import { dataLoader } from '@/utils/data-loader'

export const solveDay1A = async (path: string) => {
  const data = await dataLoader(path)
  let perElf: number[] = []
  data.reduce((acc, curr) => {
    if (curr === '') {
      perElf.push(acc)
      return 0
    } else {
      return acc + Number(curr)
    }
  }, 0)
  return perElf.reduce((acc, curr) => {
    return curr > acc ? curr : acc
  }, 0)
}

export const solveDay1B = async (path: string) => {
  const data = await dataLoader(path)
  let perElf: number[] = []
  data.reduce((acc, curr) => {
    if (curr === '') {
      perElf.push(acc)
      return 0
    } else {
      return acc + Number(curr)
    }
  }, 0)

  return perElf
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0)
}
