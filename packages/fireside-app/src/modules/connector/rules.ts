import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as t from './types'

addRule<a.SetConnector,never>({
  id: 'story/MANAGE_UPDATE',
  target: at.SET_CONNECTOR,
  output: at.UPDATE_STORY,
  concurrency: 'LAST',
  consequence: (action, {dispatch}) => {
    const connector = action.payload
    connector.onChange((story?:t.Story) => {
      dispatch(a.updateStory(story))
    })
    return () => null
  }
})