import { dataLoader } from '@/utils/data-loader'

export interface MoveInstructions {
  amount: number
  from: number
  to: number
}

export const solveDay5A = async (path: string): Promise<string> => {
  const data = await dataLoader(path)
  const startingBoxes = addBoxesToArray(
    getAllBoxes(data).map((row) => addEmptyBoxes(row)),
  )

  const moveInstructions = getMoveInstructions(data)

  const workDone = moveAccordingToInstructions(
    moveInstructions,
    startingBoxes,
    '9000',
  )

  return getTopBoxes(workDone)
}

const getTopBoxes = (boxes: string[][]) => {
  // take the "top" boxes, ie last item of array and strip
  // away the box
  return boxes
    .reduce((acc, curr) => {
      const bottom = curr.pop()!.replaceAll(/\[|\]/g, '')
      acc.push(bottom)
      return acc
    }, new Array<string>())
    .join('')
}

export const solveDay5B = async (path: string): Promise<string> => {
  const data = await dataLoader(path)
  const startingBoxes = addBoxesToArray(
    getAllBoxes(data).map((row) => addEmptyBoxes(row)),
  )

  const moveInstructions = getMoveInstructions(data)

  const workDone = moveAccordingToInstructions(
    moveInstructions,
    startingBoxes,
    '9001',
  )

  return getTopBoxes(workDone)
}

export const moveAccordingToInstructions = (
  moveInstructions: MoveInstructions[],
  startingBoxes: string[][],
  craneType: '9000' | '9001',
) => {
  return moveInstructions.reduce((acc, { amount, from, to }) => {
    //splice with negative number takes from end of array
    const boxesToMove = acc[from].splice(-amount)
    if (craneType === '9000') {
      // old crane version takes one at a time so we need to reverse the order to simulate that
      boxesToMove.reverse()
    }
    acc[to].push(...boxesToMove)
    return acc
  }, startingBoxes)
}

export const getMoveInstructions = (data: string[]) => {
  return data
    .filter((row) => row.includes('move'))
    .map((row) => {
      const [amount, from, to] = row.match(/(\d+)/g)!
      // adapt to index 0 array
      return {
        amount: Number(amount)!,
        from: Number(from)! - 1,
        to: Number(to)! - 1,
      } as MoveInstructions
    })
}

export const addBoxesToArray = (boxes: string[]) => {
  return boxes.reverse().reduce((acc: string[][], curr, index): string[][] => {
    const makeSpace = curr.replaceAll('][', '] [')
    const split = makeSpace.split(' ')
    if (index === 0) {
      // bottom row is added as the base
      split.forEach((s) => {
        if (s !== '[-]') {
          acc.push([s])
        }
      })
      return acc
    }

    // all other boxes are piled on top the bottomw row
    split.forEach((box, index) => {
      if (box !== '[-]') {
        acc[index].push(box)
      }
    })

    return acc
  }, [])
}

export const getAllBoxes = (data: string[]): string[] => {
  let index = 0
  data.forEach((row, i) => {
    if (row.startsWith(' 1')) {
      index = i
      return
    }
  })
  return data.slice(0, index)
}

export const addEmptyBoxes = (row: string): string => {
  // replace 4 spaces in a row with an empty box
  return row.replaceAll(/[\s]{4}/g, '[-]')
}
