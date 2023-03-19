
// import './rules'

import {State} from './reducer'
import * as a from './actions'
import * as c from './const'
import * as s from './selectors'
// import * as t from './types'

export {a,c,s}
export {default} from './reducer'


export {default as useComponentIconList} from './hooks/useComponentIconList'
export {default as useComponentBadgeList} from './hooks/useComponentBadgeList'
export {default as useGridRowIconList} from './hooks/useGridRowIconList'
export {default as useGridRowBadgeList} from './hooks/useGridRowBadgeList'
export {default as useGridRowSettingList} from './hooks/useGridRowSettingList'
export {default as useSettingsPageComponents} from './hooks/useSettingsPageComponents'
export {default as usePluginState} from './hooks/usePluginState'
export {default as useStaticComponents} from './hooks/useStaticComponents'
export {default as useExtendedButtonList} from './hooks/useExtendedButtonList'

declare global {
  interface RootState { plugins: State }
  interface ModuleActions { plugins: a.Action }
}