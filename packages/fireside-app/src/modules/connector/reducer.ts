import * as t from './types'
import * as at from './const'
import {Action} from './actions'

export type State = null | t.Connector

export const defaultState = null

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.SET_CONNECTOR: return action.payload
    default: return state
  }
}