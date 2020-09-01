import {PluginEvent} from '@kaminrunde/fireside-utils'
import p1 from 'plugins/full-width-components'
import {Action} from './actions'
import * as at from './const'


export type State = {
  data: PluginEvent[],
  states: Record<string, any>
}

export const defaultState:State = {
  data: [...p1({key:"fullWidth"})],
  states: {
    fullWidth: {}
  }
}

export default function reducer (state:State=defaultState, action:Action) {
  switch(action.type) {
    case at.SET_STATE: return {
      ...state,
      states: {
        ...state.states,
        [action.meta.key]: action.payload
      }
    }
    default: return state
  }
}