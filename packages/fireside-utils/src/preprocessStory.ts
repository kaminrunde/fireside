import * as t from './types'
import preprocessComponent from './preprocessComponent'
import createComponentGridContexts from './createComponentGridContexts'
import versionUpdate from './versionUpdate'

export default async function preprocessStory(story: t.RawStory, config: t.Config) {
  story = versionUpdate(story)
  const formatted: t.FormattedStory = {
    hash: story.hash,
    componentsById: {},
    allComponents: [],
    grids: story.grids,
    events: [],
    plugins: story.plugins || {}
  }

  const usedComponentIds: Record<string, boolean> = {}
  for (const ms in story.grids) {
    for (const row of story.grids[ms].grid) {
      for (const id of row) {
        usedComponentIds[id] = true
      }
    }
  }

  let cachedGridContexts: ReturnType<typeof createComponentGridContexts>
  const getGridContexts = (id: string) => {
    if (!cachedGridContexts) cachedGridContexts = createComponentGridContexts(story)
    return cachedGridContexts[id]
  }

  const formattedComponents = await Promise.all(
    story.allComponents
      .filter(name => usedComponentIds[name])
      .map(name => story.componentsById[name])
      .map(c => preprocessComponent(c, () => getGridContexts(c.id), {
        resolveController: config.resolveController
      }))
  )


  formattedComponents.forEach(([c, events], i) => {
    formatted.componentsById[c.id] = c
    formatted.allComponents.push(c.id)
    formatted.events.push(...events)
  })

  return formatted
}