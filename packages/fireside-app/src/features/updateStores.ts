import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import * as grid from 'modules/grid'

addRule<connector.a.UpdateStory,never>({
  id: 'feature/UPDATE_STORES',
  target: connector.c.UPDATE_STORY,
  output: [grid.c.UPDATE_GRID],
  consequence: action => {
    return grid.a.init(action.payload.grids)
  }
})