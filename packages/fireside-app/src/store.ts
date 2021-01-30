import 'features'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import ruleMiddleware from 'redux-ruleset'
import { createReduxHistoryContext, reachify } from "redux-first-history"
import { createBrowserHistory } from 'history'

import gridReducer from 'modules/grid'
import snackbarReducer from 'modules/snackbar'
import connectorReducer from 'modules/connector'
import componentsReducer from 'modules/components'
import uiReducer from 'modules/ui'
import settingsReducer from 'modules/settings'
import pluginsReducer from 'modules/plugins'
import modalReducer from 'modules/modal'


const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
  history: createBrowserHistory()
})

const rootReducer = combineReducers({
  grid: gridReducer,
  snackbar: snackbarReducer,
  connector: connectorReducer,
  router: routerReducer,
  components: componentsReducer,
  ui: uiReducer,
  settings: settingsReducer,
  plugins: pluginsReducer,
  modal: modalReducer
})


let composeEnhancers = compose

const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension
}


const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      ruleMiddleware,
      routerMiddleware
    )
  )
)

export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof rootReducer>

export const history = reachify(createReduxHistory(store))

export default store

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
  interface ModuleActions {}
  type ValueOf<T> = T[keyof T]
  type RootAction = ValueOf<ModuleActions>
}