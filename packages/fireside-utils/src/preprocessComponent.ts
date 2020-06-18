import * as t from './types'

type Config = {
  resolveController: (name:string) => t.Controller | Promise<t.Controller>
}

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
  name:string,
  c:t.Component, 
  config:Config
):Promise<[t.Component, any[]]> {
  const controller = await config.resolveController(name)
  let updated = Object.assign({},c)
  let storyEvents = []

  if(controller.versionUpdate){
    updated.props = controller.versionUpdate(updated.props)
  }

  if(controller.preprocessProps){
    updated.props = controller.preprocessProps(updated.props)
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