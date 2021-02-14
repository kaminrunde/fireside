import * as t from './types'
import * as at from './const'
import {Action} from './actions'

export type State = null | t.Message

export const defaultState:State = null

export default function reducer (state:State=defaultState, action:Action) {
  switch(action.type) {
    case at.SET_MESSAGE: return action.payload
    case at.CLEAR_MESSAGE: return null
    default: return state
  }
}