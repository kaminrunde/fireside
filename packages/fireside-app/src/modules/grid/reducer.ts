import produce from 'immer'
import * as t from './types'
import * as at from './const'
import * as gridHelper from './utils/grid-helper'
import {Action} from './actions'

export type State = Record<string,t.Grid>

export const defaultState:State = {}

export default produce((state:State, action:Action) => {
  switch(action.type){
    case at.INIT: {
      return action.payload
    }
    case at.UPDATE_GRID: {
      const {mediaSize} = action.meta
      if(!state[mediaSize]){
        state.mediaSize = {
          gridAreas: [],
          widths: ['1fr'],
          heights: ['auto']
        }
        break
      }
      state[mediaSize].gridAreas = action.payload
      state[mediaSize].heights = gridHelper.calculateHeights(
        state[mediaSize].heights, 
        state[mediaSize].gridAreas
      )
      break
    }
    case at.ADD_WIDTH: {
      const {mediaSize} = action.meta
      state[mediaSize].widths.push(action.payload)
      break
    }
    case at.REMOVE_WIDTH: {
      const {mediaSize} = action.meta
      state[mediaSize].widths.pop()
      break
    }
    case at.SET_WIDTH: {
      const {mediaSize,index} = action.meta
      state[mediaSize].widths[index] = action.payload
      break
    }
    case at.SET_HEIGHT: {
      const {mediaSize,index} = action.meta
      state[mediaSize].heights[index] = action.payload
      break
    }
    case at.ADD_FROM_BUFFER: {
      const {mediaSize} = action.meta
      state[mediaSize].gridAreas.unshift(action.payload)
      break
    }
    case at.TO_BUFFER: {
      const {mediaSize} = action.meta
      const index = state[mediaSize].gridAreas.findIndex(area => area.i === action.payload.i)
      if(index === -1) break
      state[mediaSize].gridAreas.splice(index,1)
      break
    }
  }
}, defaultState)

