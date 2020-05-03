import * as t from './types'
import * as at from './const'

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

export type Add = ReturnType<typeof add>
export type Remove = ReturnType<typeof remove>
export type Load = ReturnType<typeof load>
export type Unload = ReturnType<typeof unload>

export type Action =
| Add
| Remove
| Load
| Unload