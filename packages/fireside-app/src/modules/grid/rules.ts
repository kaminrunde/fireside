import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as s from './selectors'
import {State} from './reducer'

type RootState = {grid:State}

/**
 * 
 */
addRule<a.AddFromBuffer,RootState>({
  id: 'grid/REMOVE_STATIC',
  target: at.ADD_FROM_BUFFER,
  output: at.UPDATE_GRID,
  delay: 400,
  consequence: (action, {getState}) => {
    const state = getState()
    const grid = s.getGrid(state.grid, action.meta.mediaSize)
    return a.updateGrid(action.meta.mediaSize, grid.gridAreas.map(a => ({
      x: a.x,
      y: a.y,
      w: a.w,
      h: a.h,
      i: a.i
    })))
  }
})