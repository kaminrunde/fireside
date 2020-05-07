import {addRule} from 'redux-ruleset'
import * as at from './const'
// import * as t from './types'
import * as a from './actions'

addRule<a.AddMessage>({
  id: 'snackbar/REMOVE_MSG_AFTER_TIME',
  target: at.ADD_MESSAGE,
  output: at.REMOVE_MESSAGE,
  delay: 5000,
  consequence: action => a.removeMessage(action.payload)
})