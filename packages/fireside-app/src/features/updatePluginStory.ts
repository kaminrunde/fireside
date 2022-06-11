import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import * as plugins from 'modules/plugins'


/**
 * When the user changes the story
 * Then we want to inform our plugins about the change
 */
addRule<
| connector.a.UpdateConnector
>({
  id: 'feature/UPDATE_PLUGIN_STORY',
  target: connector.c.UPDATE_CONNECTOR,
  output: plugins.c.SET_STORY,
  consequence: (action) => {
    return plugins.a.setStory(action.payload)
  }
})
