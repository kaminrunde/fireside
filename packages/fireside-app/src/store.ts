import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import ruleMiddleware from 'redux-ruleset'

import gridReducer from 'modules/grid'
import snackbarReducer from 'modules/snackbar'


declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const rootReducer = combineReducers({
  grid: gridReducer,
  snackbar: snackbarReducer
})


let composeEnhancers = compose

const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension
}

export default createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware/*::<RootState,Action,Dispatch>*/(ruleMiddleware)
  )
)