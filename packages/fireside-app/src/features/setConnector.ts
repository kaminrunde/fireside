import {addRule} from 'redux-ruleset'
import * as $connector from 'modules/connector'
// import connector from 'modules/connector/utils/demoConnector'
import connector from 'modules/connector/utils/contentfulConnector'
import {LOCATION_CHANGE} from "redux-first-history"

addRule({
  id: 'feature/SET_CONNECTOR',
  target: LOCATION_CHANGE,
  output: $connector.c.SET_CONNECTOR,
  delay: 500,
  addOnce: true,
  consequence: () => {
    return $connector.a.setConnector(connector)
  }
})