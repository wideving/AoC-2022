import { dataLoader } from 'src/utils/data-loader'

const solveDay1 = async (path: string) => {
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

export default solveDay1
