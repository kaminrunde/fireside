import * as at from './const'
import {PluginEvent} from '@kaminrunde/fireside-utils'

export const setState = (key:string, state:any) => ({
  type: at.SET_STATE,
  meta: {key},
  payload: state
})

export const setPluginEvents = (events:PluginEvent[]) => ({
  type: at.SET_PLUGIN_EVENTS,
  payload: events
})

export type SetState = ReturnType<typeof setState>
export type SetPluginEvents = ReturnType<typeof setPluginEvents>

export type Action = 
| SetState
| SetPluginEvents