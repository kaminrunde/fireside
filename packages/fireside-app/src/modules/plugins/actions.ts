import * as at from './const'
import {PluginEvent} from '@kaminrunde/fireside-utils'

export const init = (states:{[key:string]:any}) => ({
  type: at.INIT,
  payload: states
})

export const setState = (key:string, state:any) => ({
  type: at.SET_STATE,
  meta: {key},
  payload: state
})

export const setPluginEvents = (events:PluginEvent[]) => ({
  type: at.SET_PLUGIN_EVENTS,
  payload: events
})

export type Init = ReturnType<typeof init>
export type SetState = ReturnType<typeof setState>
export type SetPluginEvents = ReturnType<typeof setPluginEvents>

export type Action = 
| Init
| SetState
| SetPluginEvents