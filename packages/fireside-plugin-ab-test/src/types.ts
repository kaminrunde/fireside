
export type State = {
  components: {
    [ms:string]: {
      A: number[]
      B: number[]
    }
  }
  // Record<string, Record<string, 'A' | 'B'>>
  byId: {
    [id:string]: {
      [ms:string]: 'A' | 'B'
    }
  }
} | undefined

export type PluginOptions = {
  key: string
  password?: string
  blacklist?: string[]
}