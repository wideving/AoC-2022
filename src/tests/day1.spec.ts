import { describe, expect, it } from 'vitest'
import solveDay1 from '../day1'
describe('day1', () => {
  it('should return correct result from test data', async () => {
    const path = 'src/day1/test-input.txt'
    expect(await solveDay1(path)).toBe(24000)
  })

  it('should reutnr correct result from full data', async () => {
    const path = 'src/day1/full-input.txt'
    expect(await solveDay1(path)).toBe(69883)
  })
})
