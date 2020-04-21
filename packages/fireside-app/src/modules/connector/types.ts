
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
  name: string,
  onChange: (cb:(story?:Story) => void) => void,
  setStory: (story:Story) => void
}