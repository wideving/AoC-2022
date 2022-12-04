import { dataLoader } from '@/utils/data-loader'

export enum Move {
  Rock = 1,
  Paper = 2,
  Scissor = 3,
}

type MoveLiteral = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z'

export const solveDay2A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  return data.reduce((acc, curr) => {
    const [player2, player1] = curr.split(' ')

    return (
      acc +
      getScore(getMove(player1 as MoveLiteral), getMove(player2 as MoveLiteral))
    )
  }, 0)
}

export const solveDay2B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

  return data.reduce((acc, curr) => {
    const [player2Literal, endResult] = curr.split(' ')
    const player2 = getMove(player2Literal as MoveLiteral)

    let player1: Move | null = null

    // draw
    if (endResult === 'Y') {
      player1 = player2
    }

    // win
    if (endResult === 'Z') {
      switch (player2) {
        case Move.Rock:
          player1 = Move.Paper
          break
        case Move.Paper:
          player1 = Move.Scissor
          break
        case Move.Scissor:
          player1 = Move.Rock
          break
      }
    }

    // lose
    if (endResult === 'X') {
      switch (player2) {
        case Move.Rock:
          player1 = Move.Scissor
          break
        case Move.Paper:
          player1 = Move.Rock
          break
        case Move.Scissor:
          player1 = Move.Paper
          break
      }
    }

    return acc + getScore(player1!, player2)
  }, 0)
}

export const getMove = (move: MoveLiteral): Move => {
  if (move === 'A' || move === 'X') return Move.Rock
  if (move === 'B' || move === 'Y') return Move.Paper
  if (move === 'C' || move === 'Z') return Move.Scissor
  throw new Error('Not possible')
}

export const getScore = (player1: Move, player2: Move): number => {
  if (player1 === player2) {
    return player1 + 3
  }
  switch (player1) {
    case Move.Rock:
      return player2 === Move.Scissor ? Move.Rock + 6 : Move.Rock
    case Move.Paper:
      return player2 === Move.Rock ? Move.Paper + 6 : Move.Paper
    case Move.Scissor:
      return player2 === Move.Paper ? Move.Scissor + 6 : Move.Scissor
  }
}
