import { getMove, getScore, Move, solveDay2A, solveDay2B } from '@/day2'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day2/test-input.txt'
const FULL_PATH = 'src/day2/full-input.txt'

describe('day2 A', () => {
  it('should be defined', async () => {
    expect(solveDay2A).toBeTruthy()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay2A(PATH)).toEqual(15)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay2A(FULL_PATH)).toEqual(11603)
  })

  it('should return correct hand move enum', async () => {
    const rock1 = getMove('A')
    const rock2 = getMove('X')
    expect(rock1).toEqual(Move.Rock)
    expect(rock2).toEqual(Move.Rock)

    const paper1 = getMove('B')
    const paper2 = getMove('Y')
    expect(paper1).toEqual(Move.Paper)
    expect(paper2).toEqual(Move.Paper)

    const scissor1 = getMove('C')
    const scissor2 = getMove('Z')
    expect(scissor1).toEqual(Move.Scissor)
    expect(scissor2).toEqual(Move.Scissor)
  })

  it('should calculate correct score', async () => {
    expect(getScore(Move.Rock, Move.Rock)).toEqual(4)
    expect(getScore(Move.Rock, Move.Scissor)).toEqual(7)
    expect(getScore(Move.Rock, Move.Paper)).toEqual(1)

    expect(getScore(Move.Paper, Move.Paper)).toEqual(5)
    expect(getScore(Move.Paper, Move.Rock)).toEqual(8)
    expect(getScore(Move.Paper, Move.Scissor)).toEqual(2)

    expect(getScore(Move.Scissor, Move.Scissor)).toEqual(6)
    expect(getScore(Move.Scissor, Move.Paper)).toEqual(9)
    expect(getScore(Move.Scissor, Move.Rock)).toEqual(3)
  })
})

describe('day2 B', () => {
  it('should return correct result from test data', async () => {
    expect(await solveDay2B(PATH)).toEqual(12)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay2B(FULL_PATH)).toEqual(12725)
  })
})
