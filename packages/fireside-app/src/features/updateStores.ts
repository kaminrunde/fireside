import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import * as grid from 'modules/grid'
import * as components from 'modules/components'

addRule<connector.a.UpdateStory,never>({
  id: 'feature/UPDATE_STORES',
  target: connector.c.UPDATE_STORY,
  output: [grid.c.UPDATE_GRID],
  consequence: (action, {dispatch}) => {
    const {grids, componentsById, allComponents} = action.payload
    console.log()
    const updates = [
      grid.a.init(grids),
      components.a.init(componentsById, allComponents)
    ]
    updates.forEach(update => dispatch(update))
  }
})