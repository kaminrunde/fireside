
// import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'
// import * as t from './types'

export {a,c,s}
export {default} from './reducer'


export {default as useComponentIconList} from './hooks/useComponentIconList'
export {default as usePluginState} from './hooks/usePluginState'

declare global {
  interface RootState { plugins: State }
  interface ModuleActions { plugins: a.Action }
}