import * as t from './types'
import preprocessComponent from './preprocessComponent'
import formatGrid from './formatGrid'
import createComponentGridContexts from './createComponentGridContexts'

export default async function preprocessStory (story:t.RawStory, config:t.Config) {
  const formatted:t.FormattedStory = {
    hash: story.hash,
    componentsById: {},
    allComponents: story.allComponents,
    grids: {},
    events: [],
    plugins: story.plugins || {}
  }

  const gridContexts = createComponentGridContexts(story)

  const formattedComponents = await Promise.all(
    story.allComponents
      .map(name => story.componentsById[name])
      .map(c => preprocessComponent(c, gridContexts[c.id], {
        resolveController: config.resolveController
      }))
  )


  formattedComponents.forEach(([c,events],i) => {
    const id = story.allComponents[i]
    formatted.componentsById[id] = {...c, gridContext: gridContexts[id] }
    formatted.events.push(...events)
  })

  Object.entries(story.grids)
    .map(([key, val]) => [key, formatGrid(val, {
      allIds: story.allComponents,
    })] as [string, ReturnType<typeof formatGrid>])
    .forEach(([key, val]) => {
      formatted.grids[key] = val
    })

  return formatted
}