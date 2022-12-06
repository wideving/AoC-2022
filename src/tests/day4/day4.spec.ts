import { solveDay4A, solveDay4B } from '@/day4'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day4/test-input.txt'
const FULL_PATH = 'src/day4/full-input.txt'

describe('day4 A', () => {
  it('should be defined', async () => {
    expect(solveDay4A).toBeDefined()
  })
})

describe('day4 B', () => {
  it('should be defined', async () => {
    expect(solveDay4B).toBeDefined()
  })
})
