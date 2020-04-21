import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import demoConnector from 'modules/connector/utils/demoConnector'
import {LOCATION_CHANGE} from "redux-first-history"

addRule({
  id: 'feature/SET_CONNECTOR',
  target: LOCATION_CHANGE,
  output: connector.c.SET_CONNECTOR,
  delay: 500,
  addOnce: true,
  consequence: () => {
    return connector.a.setConnector(demoConnector)
  }
})