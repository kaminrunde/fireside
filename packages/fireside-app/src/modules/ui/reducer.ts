import * as at from './const'
import {Action} from './actions'
import produce from 'immer'
import * as t from './types'

export type State = {
  sidebarOpen: boolean
  modal: t.ModalConfig | null
}

export const defaultState:State = {
  sidebarOpen: false,
  modal: null
}

export default produce((state=defaultState,action:Action) => {
  switch(action.type){
    case at.CLEAR: return defaultState
    case at.SET_SIDEBAR_OPEN: {
      state.sidebarOpen = action.payload
      return
    }
    case at.SHOW_MODAL: {
      if(!state.modal) {
        state.modal = action.payload
      }
      return
    }
    case at.HIDE_MODAL: {
      state.modal = null
      return
    }
  }
}, defaultState)