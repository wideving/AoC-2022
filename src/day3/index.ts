import { dataLoader } from '@/utils/data-loader'

export const PRIORITIES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const solveDay3A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  return data.reduce((acc, curr) => {
    const [first, second] = splitItemsInTwo(curr)
    const duplicate = findDuplicate(first, second)
    return acc + calculatePriorities(duplicate)
  }, 0)
}

export const solveDay3B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const pairs = pairOf3(data)
  return pairs.reduce((acc, curr) => {
    const badge = findCommonBadge(curr)
    return acc + calculatePriorities(badge)
  }, 0)
}

export const findCommonBadge = ([first, second, third]: string[]): string => {
  return Array.from(first).filter((item) => {
    return second.includes(item) && third.includes(item)
  })[0]
}

export const pairOf3 = (data: string[]): string[][] => {
  let pairs: string[][] = []

  while (data.length > 0) {
    pairs.push(data.splice(0, 3))
  }
  return pairs
}

export const calculatePriorities = (item: string) => {
  return PRIORITIES.indexOf(item) + 1
}

export const findDuplicate = (first: string, second: string): string => {
  return first.split('').filter((c) => second.includes(c))[0]
}

export const splitItemsInTwo = (items: string): string[] => {
  const middle = items.length / 2
  const first = items.substring(0, middle)
  const second = items.substring(middle)
  return [first, second]
}
