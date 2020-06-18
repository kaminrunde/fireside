
export type Config = {
  resolveController: (name:string) => Controller | Promise<Controller>
}

export type Controller = {
  versionUpdate?: Function,
  createContext?: Function,
  preprocessProps?: Function,
  createStoryEvents?: Function
}

/**
 * Basic building block for stories
 */
export type Component = {
  name: string,
  id: string,
  props: {
    gridArea: string
  }
}

/**
 * Format in which grid will be saved in fireside connector (e.g Contentful)
 * Can be transformed further with fireside-utils
 */
export type RawGrid = {
  enabled: boolean,
  gap: number,
  grid: string[][],
  widths: string[],
  heights: string[]
}

/**
 * Format in which Story will be saved in fireside connector (e.g Contentful)
 * Can be transformed further with fireside-utils
 */
export type RawStory = {
  hash: string,
  componentsById: Record<string, Component>,
  allComponents: string[],
  grids: Record<string, RawGrid>
}

/**
 * RawStory is transformed in this format which can be used in apps
 */
export type FormattedStory = {
  hash: string,
  events: any[],
  componentsById: Record<string, Component>,
  allComponents: string[],
  grids: Record<string, string>
}