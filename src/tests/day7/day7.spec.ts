import {
  getType,
  parseCommand,
  parseFile,
  parseRow,
  solveDay7A,
  Type,
} from '@/day7'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day7/test-input.txt'
const FULL_PATH = 'src/day7/full-input.txt'

describe('day7 A', () => {
  it('should be defined', async () => {
    expect(solveDay7A).toBeDefined()
  })

  it('should return correct type', () => {
    expect(getType('dir a')).toEqual(Type.folder)
    expect(getType('234234234 b.txt')).toEqual(Type.file)
  })

  it('should correctly parse a file', () => {
    expect(parseFile('234234234 b.txt')).toEqual({
      name: 'b.txt',
      size: 234234234,
    })
  })

  it('should parse a command', () => {
    expect(parseCommand('$ cd ..')).toEqual({ type: 'cd', args: '..' })
    expect(parseCommand('$ ls')).toEqual({ type: 'ls', args: undefined })
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay7A(PATH))
  })
})

// describe('day7 B', () => {
//   it('should be defined', async () => {
//     expect(solveDay6B).toBeDefined()
//   })

//   it('should return correct result from test data', async () => {
//     expect(await solveDay7B(PATH)).toEqual(23)
//   })

//   it('should return correct result from full data', async () => {
//     expect(await solveDay7B(FULL_PATH)).toEqual(3476)
//   })
// })
