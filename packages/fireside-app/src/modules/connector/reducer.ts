import * as t from './types'
import * as at from './const'
import {Action} from './actions'

export type State = {
  connector: null | t.Connector,
  story: null | t.Story
}

export const defaultState:State = {
  connector: null,
  story: null
}

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.SET_CONNECTOR: return {...state, connector: action.payload}
    case at.UPDATE_STORY: return {...state, story: action.payload}
    default: return state
  }
}