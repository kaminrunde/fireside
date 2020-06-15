
export type Story = {
  hash: string,
  componentsById: Record<string, {
    name: string,
    id: string,
    props: {
      gridArea: string
    }
  }>,
  allComponents: string[],
  grids: {
    [size:string]: {
      gap: number,
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