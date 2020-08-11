import {addRule} from 'redux-ruleset'
import * as $components from 'modules/components'
import * as $snackbar from 'modules/snackbar'

addRule<$components.a.UpdateComponet>({
  id: 'feature/VALLIDATE_COMPONENT_UPDATE',
  target: $components.c.UPDATE_COMPONENT,
  output: $snackbar.c.ADD_MESSAGE,
  position: 'INSTEAD',
  condition: (action, {getState, context}) => {
    const state = getState()
    const prevId = context.get('prevId') || null
    const errorCode = getErrorCode(prevId, action, state)
    return errorCode === 'OK' ? false : true
  },
  addWhen: function* (next, {context}) {
    const action = yield next($components.c.LOAD)
    if(action.payload) {
      context.set('prevId', action.payload)
      return 'ADD_RULE'
    }
    else return 'REAPPLY_ADD_WHEN'
  },
  addUntil: function* (next, {context}) {
    yield next($components.c.UNLOAD)
    context.set('prevId', null)
    return 'RECREATE_RULE'
  },
  consequence: (action, {getState, context}) => {
    const state = getState()
    const prevId = context.get('prevId') || null
    const errorCode = getErrorCode(prevId, action, state)

    if(errorCode === 'DIFFERENT_GRID_AREA') return $snackbar.a.addMessage({
      title: ' You cannot change Grid-Area',
      type: 'warning',
      content: `Changing Grid-Areas will be supported in a later update. For now `
      + `you have delete your component and write it again with another grid-area`
    })

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
  prevId: string | null,
  action:$components.a.UpdateComponet, 
  state:RootState
):'OK' | 'DUBLICATE_GRID_AREA' | 'WRONG_CHAR' | 'DIFFERENT_GRID_AREA' {
  if(action.payload.props.gridArea.match(/[^A-Za-z0-9_-]+/)){
    return 'WRONG_CHAR'
  }
  if(prevId !== action.payload.props.gridArea) return 'DIFFERENT_GRID_AREA'
  const components = $components.s.getComponents(state.components)
  for(let component of components) {
    if(component.props.gridArea === action.payload.props.gridArea){
      return 'DUBLICATE_GRID_AREA'
    }
  }
  return 'OK'
}