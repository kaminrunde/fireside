import * as at from './const'
import {Action} from './actions'
import produce from 'immer'

export type State = {
  sidebarOpen: boolean
}

export const defaultState = {
  sidebarOpen: false
}

export default produce((state:State,action:Action) => {
  switch(action.type){
    case at.SET_SIDEBAR_OPEN: {
      state.sidebarOpen = action.payload
      return
    }
  }
}, defaultState)