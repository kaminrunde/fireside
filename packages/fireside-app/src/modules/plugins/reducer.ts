import {PluginEvent} from '@kaminrunde/fireside-utils'
import {Action} from './actions'
import * as at from './const'


export type State = {
  data: PluginEvent[],
  states: Record<string, any>
}

export const defaultState:State = {
  data: [],
  states: {}
}

export default function reducer (state:State=defaultState, action:Action) {
  switch(action.type) {
    case at.SET_PLUGIN_EVENTS: return {
      data: action.payload,
      states: action.payload
        .filter(e => e.type === 'INITIAL_STATE')
        .reduce((states, e) => {
          states[e.meta.key] = e.payload
          return states
        }, {})
    }
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