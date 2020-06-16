import * as at from './const'
import {Action} from './actions'
import config from 'config'

export type State = {
  activeMediaSizes: Record<string, boolean>,
}

export const defaultState:State = {
  activeMediaSizes: config.mediaSizes.reduce<Record<string, boolean>>((p,n) => {
    p[n.key] = n.initialyActive || false
    return p
  }, {})
}

export default function reducer (state:State=defaultState, action:Action) {
  switch(action.type) {
    case at.INIT: return {
      ...state,
      activeMediaSizes: {
        ...state.activeMediaSizes,
        ...action.payload.activeMediaSizes,
      }
    }
    case at.TOGGLE_MEDIA_SIZE: return {
      ...state,
      activeMediaSizes: {
        ...state.activeMediaSizes,
        [action.payload]: !state.activeMediaSizes[action.payload]
      }
    }
    default: return state
  }
}