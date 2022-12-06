import { dataLoader } from '@/utils/data-loader'

export const solveDay4A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  return data.reduce((acc, curr) => {
    return (fullyContainsSection(curr) ? 1 : 0) + acc
  }, 0)
}

export const fullyContainsSection = (input: string) => {
  const [first, second] = input.split(',')
  const [firstStart, firstEnd] = first.split('-').map((s) => Number(s))
  const [secondStart, secondEnd] = second.split('-').map((s) => Number(s))

  return (
    (firstStart >= secondStart && firstEnd <= secondEnd) ||
    (secondStart >= firstStart && secondEnd <= firstEnd)
  )
}

export const doesntContainsSection = (input: string) => {
  const [first, second] = input.split(',')
  const [firstStart, firstEnd] = first.split('-').map((s) => Number(s))
  const [secondStart, secondEnd] = second.split('-').map((s) => Number(s))

  return firstEnd < secondStart || secondEnd < firstStart
}

export const solveDay4B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  return data.reduce((acc, curr) => {
    return (doesntContainsSection(curr) ? 0 : 1) + acc
  }, 0)
}
