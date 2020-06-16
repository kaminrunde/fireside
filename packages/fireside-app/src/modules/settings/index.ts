
// import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
// import * as s from './selectors'
// import * as t from './types'

export {a,c}
export {default} from './reducer'


// export {default as useLoadingComponent} from './hooks/useLoadingComponent'
// export {default as useComponents} from './hooks/useComponents'

declare global {
  interface RootState { settings: State }
  interface ModuleActions { settings: a.Action }
}