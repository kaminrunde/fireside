import {addRule} from 'redux-ruleset'
import * as at from './const'
import * as a from './actions'
import * as t from './types'
import * as s from './selectors'
import {versionUpdate} from '@kaminrunde/fireside-utils'

addRule<a.SetConnector>({
  id: 'connector/MANAGE_UPDATE',
  target: at.SET_CONNECTOR,
  output: at.UPDATE_STORY,
  concurrency: 'LAST',
  consequence: (action, {dispatch}) => {
    const connector = action.payload
    connector.onChange((story?:t.Story) => {
      if(story) story = versionUpdate(story)
      dispatch(a.updateStory(story))
    })
    return () => null
  }
})

addRule<a.UpdateConnector>({
  id: 'connector/UPDATE_CONNECTOR',
  target: at.UPDATE_CONNECTOR,
  output: '#connector-update',
  consequence: (action, {getState}) => {
    const state = getState()
    const connector = s.getConnector(state.connector)
    if(!connector) return
    connector.setStory(action.payload)
  }
})