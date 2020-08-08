import {addRule} from 'redux-ruleset'
import * as $components from 'modules/components'
import * as $snackbar from 'modules/snackbar'

addRule<$components.a.Add>({
  id: 'feature/VALLIDATE_COMPONENT_ADD',
  target: $components.c.ADD,
  output: $snackbar.c.ADD_MESSAGE,
  position: 'INSTEAD',
  condition: (action, {getState}) => {
    const state = getState()
    const errorCode = getErrorCode(action, state)
    return errorCode === 'OK' ? false : true
  },
  consequence: (action, {getState}) => {
    const state = getState()
    const errorCode = getErrorCode(action, state)

    if(errorCode === 'DUBLICATE_GRID_AREA') return $snackbar.a.addMessage({
      title: 'Dublicate Grid-Area',
      type: 'warning',
      content: `You already declared "${action.payload.props.gridArea}" in one of your `
      + `other components. The Grid-Area has to be unique across all components.`
    })

    if(errorCode === 'WRONG_CHAR') return $snackbar.a.addMessage({
      title: 'Grid-Area contains invalid character',
      type: 'warning',
      content: `The Grid-Area can only contain letters, numbers, "_" or "-"`
    })
  }
})

function getErrorCode (
  action:$components.a.Add, 
  state:RootState
):'OK' | 'DUBLICATE_GRID_AREA' | 'WRONG_CHAR' {
  if(action.payload.props.gridArea.match(/[^A-Za-z0-9_-]+/)){
    return 'WRONG_CHAR'
  }
  const components = $components.s.getComponents(state.components)
  for(let component of components) {
    if(component.props.gridArea === action.payload.props.gridArea){
      return 'DUBLICATE_GRID_AREA'
    }
  }
  return 'OK'
}