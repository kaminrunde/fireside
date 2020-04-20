import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import demoConnector from 'modules/connector/utils/demoConnector'

addRule({
  id: 'feature/SET_CONNECTOR',
  target: '*',
  output: connector.c.SET_CONNECTOR,
  delay: 500,
  addOnce: true,
  consequence: () => {
    return connector.a.setConnector(demoConnector)
  }
})