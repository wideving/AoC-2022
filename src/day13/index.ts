import { dataLoader } from '@/utils/data-loader'

export interface Pair {
  left: any[]
  right: any[]
}

export const solveDay13A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  const pairs = parseToPackagePairs(data)

  return pairs.reduce((acc, curr, index) => {
    const result = compare(curr.left, curr.right)
    if (result === false) {
      // console.log(index + 1, false)
      return acc
    }

    if (result === true || result === undefined) {
      // console.log(index + 1, true)
      return acc + index + 1
    }
    throw new Error('Invalid result')
  }, 0)
}

export const compare = (
  left: any[],
  right: any[],
  result?: boolean,
): boolean | undefined => {
  let valid = result

  if (valid !== undefined) {
    return valid
  }

  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const leftValue = left[i]
    const rightValue = right[i]

    if (leftValue === undefined) {
      valid = true
      break
    }

    if (rightValue === undefined) {
      valid = false
      break
    }

    if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
      if (leftValue.length === 0 && rightValue.length === 0) {
        continue
      }

      if (leftValue.length === 0 && rightValue.length > 0) {
        valid = true
        break
      }

      if (leftValue.length > 0 && rightValue.length === 0) {
        valid = false
        break
      }

      valid = compare(leftValue, rightValue, valid)

      if (valid !== undefined) {
        break
      }
    }

    if (!Array.isArray(leftValue) && Array.isArray(rightValue)) {
      valid = compare([leftValue], rightValue, valid)
      if (valid !== undefined) {
        break
      }
    }

    if (Array.isArray(leftValue) && !Array.isArray(rightValue)) {
      valid = compare(leftValue, [rightValue], valid)
      if (valid !== undefined) {
        break
      }
    }

    if (valid !== undefined) {
      break
    }

    if (
      valid === undefined &&
      !Array.isArray(leftValue) &&
      !Array.isArray(rightValue)
    ) {
      if (leftValue === rightValue) {
        continue
      }
      valid = leftValue < rightValue
      break
    }
  }

  return valid
}

export const parseToPackagePairs = (data: string[]): Pair[] => {
  const pairs: Pair[] = []

  while (data.length > 0) {
    if (data[0].length === 0) {
      data.splice(0, 1)
    }

    const sub = data.splice(0, 2)
    pairs.push({
      left: parsePacket(sub[0]),
      right: parsePacket(sub[1]),
    })
  }
  return pairs
}

export const parsePacket = (data: string): any[] => {
  // this is fine... =)
  return eval(data)
}

export const isEmpty = (array: any[]) => {
  return array.flat(Infinity).length === 0
}

export const amountOfEmpties = (array: any[]): number => {
  let copy = [...array]
  let count = 0
  while (copy.some((value) => Array.isArray(value))) {
    copy = copy.flatMap((v) => {
      if (Array.isArray(v)) {
        count++
      }
      return v
    })
  }
  return count
}
