import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'

export {a,c,s}
export {default} from './reducer'

export {default as useMessages} from './hooks/useMessages'

declare global {
  interface RootState { snackbar: State }
  interface ModuleActions { snackbar: a.Action }
}