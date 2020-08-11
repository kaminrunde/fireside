import * as t from './types'


/**
 * Updates a component by defined controller
 * - versionUpdate hook is called
 * - preprocessProps hook is called
 * - createContext hook is called
 * - createStoryEvents hook is called
 * @param c Component
 * @param config Config
 */
export default async function preprocessComponent(
  c:t.Component, 
  config:t.Config
):Promise<[t.Component, any[]]> {
  const controller = await config.resolveController(c.name)
  let updated = Object.assign({},c)
  let storyEvents = []
  if(!controller) return [c, storyEvents]

  if(controller.versionUpdate){
    updated.props = controller.versionUpdate(updated.props)
  }

  if(controller.preprocessProps){
    updated.props = await controller.preprocessProps(updated.props)
  }

  if(controller.createContext){
    updated.props = Object.assign({}, updated.props, {
      context: await controller.createContext(updated.props)
    })
  }

  if(controller.createStoryEvents){
    storyEvents = await controller.createStoryEvents(updated.props)
  }

  return [updated,storyEvents]
}