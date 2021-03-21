
import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'
import * as t from './types'

export {a,c,s, t}
export {default} from './reducer'


export {default as useGrid} from './hooks/useGrid'
export {default as useUsedComponents} from './hooks/useUsedComponents'

declare global {
  interface RootState { grid: State }
  interface ModuleActions { grid: a.Action }
}