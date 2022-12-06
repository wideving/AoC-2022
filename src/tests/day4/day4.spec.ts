import {
  doesntContainsSection,
  fullyContainsSection,
  solveDay4A,
  solveDay4B,
} from '@/day4'
import { describe, expect, it } from 'vitest'

const PATH = 'src/day4/test-input.txt'
const FULL_PATH = 'src/day4/full-input.txt'

describe('day4 A', () => {
  it('should be defined', async () => {
    expect(solveDay4A).toBeDefined()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay4A(PATH)).toEqual(2)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay4A(FULL_PATH)).toEqual(305)
  })

  it('should fully contains section', () => {
    expect(fullyContainsSection('1-3,2-3')).toBeTruthy()
    expect(fullyContainsSection('21-40,22-40')).toBeTruthy()
  })
})

describe('day4 B', () => {
  it('should be defined', async () => {
    expect(solveDay4B).toBeDefined()
  })

  it('doesnt contain section', () => {
    expect(doesntContainsSection('2-4,6-8')).toBeTruthy()
    expect(doesntContainsSection('2-3,4-5')).toBeTruthy()
    expect(doesntContainsSection('5-7,7-9')).toBeFalsy()
    expect(doesntContainsSection('2-8,3-7')).toBeFalsy()
    expect(doesntContainsSection('6-6,4-6')).toBeFalsy()
    expect(doesntContainsSection('2-6,4-8')).toBeFalsy()
  })

  it('should return correct result from test data', async () => {
    expect(await solveDay4B(PATH)).toEqual(4)
  })

  it('should return correct result from full data', async () => {
    expect(await solveDay4B(FULL_PATH)).toEqual(811)
  })
})
