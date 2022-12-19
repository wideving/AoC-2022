import { dataLoader } from '@/utils/data-loader'

export interface Instruction {
  type: 'noop' | 'addx'
  cycles: number
  value: number
}

export const solveDay10A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const instructions = data.map((row) => parseInstructions(row))
  const cycleValues = calculateCycles(instructions)

  return (
    cycleValues[19] * 20 +
    cycleValues[59] * 60 +
    cycleValues[99] * 100 +
    cycleValues[139] * 140 +
    cycleValues[179] * 180 +
    cycleValues[219] * 220
  )
}

export const calculateCycles = (instructions: Instruction[]) => {
  const values: number[] = [1]
  instructions.reduce((acc, curr) => {
    for (let i = 0; i < curr.cycles; i++) {
      values.push(acc)
    }

    // dont add another cycle, modify the last one
    values[values.length - 1] = values[values.length - 1] + curr.value
    return acc + curr.value
  }, 1)

  return values
}

export const parseInstructions = (row: string): Instruction => {
  const [, type, value] = row.match(/(\w+)\s?(-?\d+)?/)!
  if (type === 'noop') {
    return {
      type: 'noop',
      cycles: 1,
      value: 0,
    }
  }

  return {
    type: 'addx',
    cycles: 2,
    value: Number(value),
  }
}
