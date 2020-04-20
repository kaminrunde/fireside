
export type Story = {
  componentsById: {[id:string]: object},
  allComponents: [],
  grids: {
    [size:string]: {
      enabled: boolean,
      gap: number,
      components: string[],
      grid: string[][],
      widths: string[],
      heights: string[]
    }
  }
}

export type Connector = {
  onChange: (story?:Story) => void,
  setStory: (story:Story) => void
}