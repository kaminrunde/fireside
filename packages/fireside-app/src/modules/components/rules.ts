import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'


/**
 * When we add a grid area from buffer
 * we had to add it as static (some bug)
 * Then we remove the static attribute
 */
addRule<a.Add>({
  id: 'components/UNLOAD_AFTER_ADD',
  target: at.ADD,
  output: at.UNLOAD,
  consequence: () => a.unload()
})