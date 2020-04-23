import * as t from './types'
import * as at from './const'

export const add = (component:t.Component) => ({
  type: at.ADD,
  payload: component
})

export const remove = (component:t.Component) => ({
  type: at.REMOVE,
  payload: component
})

export const load = (component?:t.Component) => ({
  type: at.LOAD,
  payload: component
})

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