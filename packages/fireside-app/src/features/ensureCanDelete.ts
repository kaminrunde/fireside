import {addRule} from 'redux-ruleset'
import * as $grid from 'modules/grid'
import * as $components from 'modules/components'
import * as $snackbar from 'modules/snackbar'

/**
 * When the user wants to delete an component
 * Then we we first want to check if he can delete this component
 * - component must not be in a grid
 * And prevent deletion if he cannot
 */
addRule<$components.a.Remove>({
  id: 'feature/ENSURE_CAN_DELETE',
  target: $components.c.REMOVE,
  output: $snackbar.c.ADD_MESSAGE,
  position: 'INSTEAD',
  condition: (action, {getState}) => {
    const id = action.payload.id
    const state = getState()
    const grids = $grid.s.getGridDict(state.grid)
    const json = JSON.stringify(grids)
    return json.includes(`"${id}"`)
  },
  consequence: () => $snackbar.a.addMessage({
    type: 'warning',
    title: 'Component exists in grid',
    content: 'This component exists in one or more grids. please remove this component from these grids before yoou delete it'
  })
})