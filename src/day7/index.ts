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

export interface WithinThresholdResult {
  acceptedFolders: number[]
  fileSize: number
}

export const solveDay7A = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  // delete initial cd / command
  data.splice(0, 1)

  const root: Folder = {
    name: '/',
    folders: [],
    files: [],
  }

  while (data.length > 0) {
    processCommand(parseCommand(data.shift()), root, data)
  }

  // root now contains the whole file system, we need to walk through it to find all
  // folders with total size at most 100000
  return findFoldersWithinThreshold(root, [], 100000).acceptedFolders.reduce(
    (acc, curr) => acc + curr,
    0,
  )
}

export const solveDay7B = async (path: string): Promise<number> => {
  const data = await dataLoader(path)
  // delete initial cd / command
  data.splice(0, 1)

  const root: Folder = {
    name: '/',
    folders: [],
    files: [],
  }

  while (data.length > 0) {
    processCommand(parseCommand(data.shift()), root, data)
  }

  const { acceptedFolders, fileSize } = findFoldersWithinThreshold(
    root,
    [],
    Number.MAX_VALUE,
  )

  const spaceAvailable = 70000000 - fileSize
  const spaceNeeded = 30000000 - spaceAvailable
  return acceptedFolders
    .sort((a, b) => a - b)
    .find((size) => size > spaceNeeded)!
}

export const findFoldersWithinThreshold = (
  folder: Folder,
  acceptedFolders: number[],
  maxFolderSize = 100000,
): WithinThresholdResult => {
  let fileSize = folder.files.reduce((acc, curr) => acc + curr.size, 0)

  for (const subfolder of folder.folders) {
    const result = findFoldersWithinThreshold(
      subfolder,
      acceptedFolders,
      maxFolderSize,
    )
    fileSize += result.fileSize
  }

  if (fileSize <= maxFolderSize) {
    // foldersize are within limits
    acceptedFolders.push(fileSize)
  }

  return {
    acceptedFolders,
    fileSize,
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
