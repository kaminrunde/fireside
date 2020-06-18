import * as t from './types'
import preprocessComponent from './preprocessComponent'
import formatGrid from './formatGrid'

export default function preprocessStory (story:t.RawStory, config:t.Config) {
  const formatted:t.FormattedStory = {
    hash: story.hash,
    componentsById: {},
    allComponents: story.allComponents,
    grids: {}
  }

  story.allComponents
    .map(name => story.componentsById[name])
    .map(c => preprocessComponent(c, {}))
    .forEach((c,i) => {
      formatted.componentsById[story.allComponents[i]] = c
    })

  Object.entries(story.grids)
    .map(([key, val]) => [key, formatGrid(val, {})])
    .forEach(([key, val]) => {
      formatted.grids[key] = val
    })

  return formatted
}