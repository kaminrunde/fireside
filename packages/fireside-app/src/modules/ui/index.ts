// import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'

export {a,c,s}
export {default} from './reducer'

export {default as useSidebar} from './hooks/useSidebar'

declare global {
  interface RootState { ui: State }
  interface ModuleActions { ui: a.Action }
}