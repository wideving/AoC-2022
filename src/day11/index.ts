import { dataLoader } from '@/utils/data-loader'

export interface Monkey {
  id: number
  operation: string[] // ['old', '*', '10'], ['old', '+', 'old'] etc
  items: number[]
  test: {
    amount: number
    isTrueThrowId: number
    isFalseThrowID: number
  }
}

export const solveDay11A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  return 0
}

export const parseMonkeys = (data: string[]) => {
  const unparsedMonkeys: string[][] = []
  const filteredData = data.filter((row) => row.length != 0)
  while (filteredData.length > 0) {
    unparsedMonkeys.push(filteredData.splice(0, 6))
  }
  console.log(unparsedMonkeys)
}
