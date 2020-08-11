import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as s from './selectors'


/**
 * When we add a grid area from buffer
 * we had to add it as static (some bug)
 * Then we remove the static attribute
 */
addRule<a.Add>({
  id: 'components/UNLOAD_AFTER_ADD',
  target: at.ADD,
  output: at.UNLOAD,
  condition: (action, {getState}) => {
    const state = getState()
    return s.isLoadingComponent(state.components)
  },
  consequence: () => a.unload()
})

addRule<a.UpdateComponet>({
  id: 'components/UNLOAD_AFTER_UPDATE',
  target: at.UPDATE_COMPONENT,
  output: at.UNLOAD,
  condition: (action, {getState}) => {
    const state = getState()
    return s.isLoadingComponent(state.components)
  },
  consequence: () => a.unload()
})