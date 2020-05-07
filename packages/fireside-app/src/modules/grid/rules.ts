import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as s from './selectors'


/**
 * When we add a grid area from buffer
 * we had to add it as static (some bug)
 * Then we remove the static attribute
 */
addRule<a.AddFromBuffer>({
  id: 'grid/REMOVE_STATIC',
  target: at.ADD_FROM_BUFFER,
  output: at.UPDATE_GRID,
  delay: 400,
  consequence: (action, {getState}) => {
    const state = getState()
    const grid = s.getGrid(state.grid, action.meta.mediaSize)
    return a.updateGrid(action.meta.mediaSize, grid.gridAreas)
  }
})