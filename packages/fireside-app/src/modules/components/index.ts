
// import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'
import * as t from './types'

export {a,c,s, t}
export {default} from './reducer'


export {default as useLoadingComponent} from './hooks/useLoadingComponent'

declare global {
  interface RootState { components: State }
  interface ModuleActions { components: a.Action }
}