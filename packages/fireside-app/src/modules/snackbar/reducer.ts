import produce from 'immer'
import * as at from './const'
import * as t from './types'
import {Action} from './actions'

export type State = t.Message[]

export const defaultState = []

export default produce((state:State, action:Action) => {
  switch(action.type){
    case at.ADD_MESSAGE: {
      state.push(action.payload)
      break
    }
    case at.REMOVE_MESSAGE: {
      var index = state.indexOf(action.payload)
      if (index !== -1) state.splice(index, 1)
      break
    }
  }
}, defaultState)