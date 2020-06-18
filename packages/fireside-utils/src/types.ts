
export type Config = {

}

export type RawStory = {
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
      enabled: boolean,
      gap: number,
      grid: string[][],
      widths: string[],
      heights: string[]
    }
  }
}

export type FormattedStory = {
  
}