import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as actions from './actions'

addRule({
  id: 'story/MANAGE_UPDATE',
  target: at.SET_CONNECTOR,
  output: at.SET_STORY,
  concurrency: 'LAST',
  consequence: ({action, dispatch}) => {
    const connector = action.payload
    connector.onChange(story => {
      dispatch(actions.setStory(story))
    })
    return () => null
  }
})