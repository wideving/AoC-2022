import { describe, expect, it } from 'vitest'
import { solveDay1A, solveDay1B } from '../day1'
describe('day1', () => {
  it('should return correct result from test data', async () => {
    const path = 'src/day1/test-input.txt'
    expect(await solveDay1A(path)).toBe(24000)
  })

  it('should return correct result from full data', async () => {
    const path = 'src/day1/full-input.txt'
    expect(await solveDay1A(path)).toBe(69883)
  })

  it('should return correct result from test data', async () => {
    const path = 'src/day1/test-input.txt'
    expect(await solveDay1B(path)).toBe(45000)
  })

  it('should return correct result from full data', async () => {
    const path = 'src/day1/full-input.txt'
    expect(await solveDay1B(path)).toBe(207576)
  })
})
