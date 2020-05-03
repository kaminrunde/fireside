
export type Story = {
  componentsById: Record<string, {
    name: string,
    id: string,
    props: {
      gridArea: string
    }
  }>,
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