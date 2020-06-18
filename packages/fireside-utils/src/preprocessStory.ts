import * as t from './types'
import preprocessComponent from './preprocessComponent'
import formatGrid from './formatGrid'

export default async function preprocessStory (story:t.RawStory, config:t.Config) {
  const formatted:t.FormattedStory = {
    hash: story.hash,
    componentsById: {},
    allComponents: story.allComponents,
    grids: {},
    events: []
  }

  const formattedComponents = await Promise.all(
    story.allComponents
      .map(name => [name, story.componentsById[name]] as [string, t.Component])
      .map(([name,c]) => preprocessComponent(name, c, {
        resolveController: config.resolveController
      }))
  )

  formattedComponents.forEach(([c,events],i) => {
    formatted.componentsById[story.allComponents[i]] = c
    formatted.events.push(...events)
  })

  Object.entries(story.grids)
    .map(([key, val]) => [key, formatGrid(val, {})] as [string, ReturnType<typeof formatGrid>])
    .forEach(([key, val]) => {
      formatted.grids[key] = val
    })

  return formatted
}