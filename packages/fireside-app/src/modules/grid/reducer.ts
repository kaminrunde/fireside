import produce from 'immer'
import * as t from './types'
import * as at from './const'
import * as gridHelper from './utils/grid-helper'
import {Action} from './actions'

export type State = {
  gridAreas: t.GridArea[],
  widths: string[],
  heights: string[]
}

export const defaultState:State = {
  gridAreas: [],
  widths: [],
  heights: []
}

export default produce((state:State, action:Action) => {
  switch(action.type){
    case at.UPDATE_GRID_AREA: {
      state.gridAreas = gridHelper.updateGridArea(state.gridAreas, action.payload)
      state.heights = gridHelper.calculateHeights(state.heights, state.gridAreas)
      break
    }
    case at.ADD_WIDTH: {
      state.widths.push(action.payload)
      break
    }
    case at.REMOVE_WIDTH: {
      state.widths.pop()
      break
    }
    case at.SET_WIDTH: {
      state.widths[action.meta.index] = action.payload
      break
    }
    case at.SET_HEIGHT: {
      state.heights[action.meta.index] = action.payload
      break
    }
  }
}, defaultState)

