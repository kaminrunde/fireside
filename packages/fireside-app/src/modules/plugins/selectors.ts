import {State} from './reducer'
import {createSelector} from 'reselect'
import createReSelector from 're-reselect'
import {pluginEvents} from '@kaminrunde/fireside-utils'

export const getComponentIcons = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'COMPONENT_ICON')
    return result as pluginEvents.ComponentIconEvent[]
  }
)

export const getGridRowIcons = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'GRID_ROW_ICON')
    return result as pluginEvents.GridRowIconEvent[]
  }
)

export const getComponentBadges = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'COMPONENT_BADGE')
    return result as pluginEvents.ComponentBadgeEvent[]
  }
)

export const getGridRowBadges = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'GRID_ROW_BADGE')
    return result as pluginEvents.GridRowBadgeEvent[]
  }
)

export const getSettingsPageComponents = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'SETTINGS_PAGE_ROW')
    return result as pluginEvents.SettingsPageRowEvent[]
  }
)

export const getStaticComponents = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'CREATE_STATIC_COMPONENT')
    return result as pluginEvents.CreateStaticComponentEvent[]
  }
)

export const getStoryCallbacksEvents = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'ON_STORY_UPDATE')
    return result as pluginEvents.OnStoryUpdateEvent[]
  }
)

export const getGridRowSettingComponents = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'GRID_ROW_SETTINGS')
    return result as pluginEvents.GridRowSettingsEvent[]
  }
)

export const getExtendedComponentButtonList = createSelector(
  (state: State) => state.data,
  (plugins) => {
    const result = plugins.filter((p) => p.type === 'EXTEND_COMPONENT_BUTTON_LIST');
    return result as pluginEvents.ExtendComponentButtonListEvent[];
  }
)

export const getState = (state:State, key:string) => state.states[key]

export const getStates = (state:State) => state.states

export const getStoryWithoutPlugins = (state:State) => state.storyWithoutPlugins


// export const getComponentState = (state:State, pluginId:string) => state.states[pluginId]