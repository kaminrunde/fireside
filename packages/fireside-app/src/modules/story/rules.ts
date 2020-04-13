import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as actions from './actions'

addRule({
  id: 'story/MANAGE_UPDATE',
  target: at.SET_CONNECTOR,
  output: at.SET_STORY,
  concurrency: 'LAST',
  consequence: ({action, dispatch}:any) => {
    const connector = action.payload
    connector.onChange((story:any) => {
      dispatch(actions.setStory(story))
    })
    return () => null
  }
})