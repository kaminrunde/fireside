import * as t from './types'
import * as at from './const'

export const init = (byId:Record<string,t.Component>, allIds:string[]) => ({
  type: at.INIT,
  payload: {byId, allIds}
})

/**
 * add component from storybook to component list
 */
export const add = (component:t.Component) => ({
  type: at.ADD,
  payload: component
})

/**
 * remove component completly
 */
export const remove = (component:t.Component) => ({
  type: at.REMOVE,
  payload: component
})

/**
 * open storybook with component. If no component was
 * given a new one will be created
 */
export const load = (componentId?:string) => ({
  type: at.LOAD,
  payload: componentId
})

/**
 * closer storybook
 */
export const unload = () => ({
  type: at.UNLOAD
})

export type Init = ReturnType<typeof init>
export type Add = ReturnType<typeof add>
export type Remove = ReturnType<typeof remove>
export type Load = ReturnType<typeof load>
export type Unload = ReturnType<typeof unload>

export type Action =
| Init
| Add
| Remove
| Load
| Unload