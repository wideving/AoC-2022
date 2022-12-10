import {
  findFoldersWithinThreshold,
  Folder,
  getType,
  parseCommand,
  parseFile,
  solveDay7A,
  solveDay7B,
  Type,
} from '@/day7'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day7/test-input.txt'
const FULL_PATH = 'src/day7/full-input.txt'

describe('day7 A', () => {
  it('should be defined', () => {
    expect(solveDay7A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay7A(PATH)).toEqual(95437)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay7A(FULL_PATH)).toEqual(1642503)
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

  it('should find a folder within treshold', () => {
    const folder: Folder = {
      name: 'a',
      files: [
        { name: 'j', size: 100 },
        { name: 'd.log', size: 100 },
        { name: 'd.ext', size: 100 },
        { name: 'k', size: 100 },
      ],
      folders: [
        {
          name: 'b',
          files: [
            { name: 'j', size: 100 },
            { name: 'd.log', size: 100 },
            { name: 'd.ext', size: 100 },
            { name: 'k', size: 100 },
          ],
          folders: [
            {
              name: 'c',
              files: [
                { name: 'j', size: 100 },
                { name: 'd.log', size: 100 },
                { name: 'd.ext', size: 100 },
                { name: 'k', size: 100 },
              ],
              folders: [],
            },
          ],
        },
      ],
    }
    const result = findFoldersWithinThreshold(folder, [], 800)
    expect(result.acceptedFolders.reduce((acc, curr) => acc + curr)).toEqual(
      1200,
    )
  })
})

describe('day7 B', () => {
  it('should be defined', async () => {
    expect(solveDay7B).toBeDefined()
  })

  it('should return total fileSize sum', () => {
    const folder: Folder = {
      name: 'a',
      files: [
        { name: 'j', size: 100 },
        { name: 'd.log', size: 100 },
        { name: 'd.ext', size: 100 },
        { name: 'k', size: 100 },
      ],
      folders: [
        {
          name: 'b',
          files: [
            { name: 'j', size: 100 },
            { name: 'd.log', size: 100 },
            { name: 'd.ext', size: 100 },
            { name: 'k', size: 100 },
          ],
          folders: [
            {
              name: 'c',
              files: [
                { name: 'j', size: 100 },
                { name: 'd.log', size: 100 },
                { name: 'd.ext', size: 100 },
                { name: 'k', size: 100 },
              ],
              folders: [],
            },
          ],
        },
      ],
    }
    const result = findFoldersWithinThreshold(folder, [], 800)
    expect(result.fileSize).toEqual(1200)
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay7B(PATH)).toEqual(24933642)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay7B(FULL_PATH)).toEqual(6999588)
  })
})
