import produce from 'immer'
import * as at from './const'
import * as t from './types'
import {Action} from './actions'

export type State = {
  messages: t.Message[]
}

export const defaultState = {
  messages: []
}

export default produce((state:State, action:Action) => {
  switch(action.type){
    case at.ADD_MESSAGE: {
      state.messages.push(action.payload)
      break
    }
    case at.REMOVE_MESSAGE: {
      state.messages = state.messages.filter(msg => 
        msg.title !== action.payload.title &&
        msg.content !== action.payload.content &&
        msg.type !== action.payload.type
      )
      break
    }
  }
}, defaultState)