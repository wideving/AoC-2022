import { dataLoader } from '@/utils/data-loader'

export enum Type {
  folder,
  file,
}

export type CommandType = 'cd' | 'ls' | 'eof'

export interface Command {
  type: CommandType
  args?: string
}

export interface File {
  name: string
  size: number
}
export interface Folder {
  parentFolder?: Folder
  name: string
  files: File[]
  folders: Folder[]
}

export const solveDay7A = async (path: string): Promise<void> => {
  const data = await dataLoader(path)
  // delete initial cd / command
  data.splice(0, 1)

  const root: Folder = {
    name: '/',
    folders: [],
    files: [],
  }

  while (data.length > 0) {
    const row = data.shift()
    processCommand(parseCommand(row), root, data)
    console.dir(root, { depth: null })
  }
}

export const processCommand = (
  command: Command,
  folder: Folder,
  data: string[],
) => {
  switch (command.type) {
    case 'ls': {
      do {
        const row = data.shift()!
        const type = getType(row)
        if (type === Type.file) {
          folder.files.push(parseFile(row))
        }

        if (type === Type.folder) {
          folder.folders.push({ parentFolder: folder, ...parseFolder(row) })
        }
      } while (data.length > 0 && !data[0].includes('$'))
      break
    }

    case 'cd': {
      processCommand(
        parseCommand(data.shift()),
        command.args === '..'
          ? folder.parentFolder!
          : folder.folders.find((f) => f.name === command.args)!,
        data,
      )
    }
    case 'eof': {
      return
    }
  }
  processCommand(parseCommand(data.shift()), folder, data)
}

export const parseCommand = (row: string | undefined): Command => {
  if (!row) {
    return {
      type: 'eof',
    }
  }

  const [, command, args] = row!.split(' ')
  return {
    type: command as CommandType,
    args: args,
  }
}

export const getType = (row: string): Type => {
  return row.includes('dir') ? Type.folder : Type.file
}

export const parseFolder = (row: string): Folder => {
  const name = row.split(' ')[1]!
  return {
    name,
    files: [],
    folders: [],
  }
}

export const parseFile = (row: string): File => {
  const [, size, name] = row.match(/(\d+)\s(.+)/)!
  return {
    name,
    size: Number(size),
  }
}

// export const solveDay7B = async (path: string): Promise<void> => {
//   const data = await dataLoader(path)
// }
