import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as t from './types'
import * as a from './actions'

addRule({
  id: 'snackbar/REMOVE_MSG_AFTER_TIME',
  target: at.ADD_MESSAGE,
  delay: 5000,
  consequence: ({action}:{
    action:ReturnType<typeof a.addMessage>
  }) => a.removeMessage(action.payload)
})