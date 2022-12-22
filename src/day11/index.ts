import { dataLoader } from '@/utils/data-loader'

export interface Monkey {
  id: number
  operation: string[]
  items: number[]
  test: {
    amount: number
    isTrueThrowId: number
    isFalseThrowID: number
  }
  inspectionCount: number
}

export const solveDay11A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const monkeys = parseMonkeys(data)
  for (let i = 0; i < 20; i++) {
    playRound(monkeys)
  }

  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount)
  return monkeys[0].inspectionCount * monkeys[1].inspectionCount
}

export const playRound = (monkeys: Monkey[]) => {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    monkey.items = monkey.items
      .map((item) => {
        const worryLevel = doOperation(item, monkey.operation)
        if (worryLevel % monkey.test.amount === 0) {
          monkeys[monkey.test.isTrueThrowId].items.push(worryLevel)
        } else {
          monkeys[monkey.test.isFalseThrowID].items.push(worryLevel)
        }
        monkey.inspectionCount++
        return -1
      })
      .filter((item) => item !== -1)
  }
}

export const doOperation = (worryLevel: number, operation: string[]) => {
  const [, operator, number] = operation
  const by = number === 'old' ? worryLevel : Number(number)
  const newWorryLevel = operator === '*' ? worryLevel * by : worryLevel + by
  return Math.floor(newWorryLevel / 3)
}

export const parseMonkeys = (data: string[]): Monkey[] => {
  const unparsedMonkeys: string[][] = []
  const filteredData = data.filter((row) => row.length != 0)

  while (filteredData.length > 0) {
    unparsedMonkeys.push(filteredData.splice(0, 6))
  }

  return unparsedMonkeys.map(
    (unparsed): Monkey => ({
      id: Number(unparsed[0].match(/\d+/)!),
      items: Array.from(unparsed[1].matchAll(/\d+/g)!).map((m) => Number(m)),
      operation: unparsed[2].match(/(\w+) (\+|\*) (\w+)/)!.slice(1),
      test: {
        amount: Number(unparsed[3].match(/\d+/)!),
        isTrueThrowId: Number(unparsed[4].match(/\d+/)!),
        isFalseThrowID: Number(Number(unparsed[5].match(/\d+/)!)),
      },
      inspectionCount: 0,
    }),
  )
}
