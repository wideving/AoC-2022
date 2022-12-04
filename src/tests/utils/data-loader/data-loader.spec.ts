import { dataLoader } from '@/utils/data-loader'
import { describe, expect, it } from 'vitest'

describe('dataLoader', () => {
  it('should return a string array from input', async () => {
    const data = await dataLoader('src/tests/utils/data-loader/test-input.txt')
    expect(data).toEqual(['test1', 'test2', 'test3'])
  })
})
