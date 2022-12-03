import fs from 'fs/promises'

export const dataLoader = async (path: string): Promise<string[]> => {
  return (
    await fs.readFile(`${process.cwd()}/${path}`, {
      encoding: 'utf-8',
    })
  ).split('\n')
}
