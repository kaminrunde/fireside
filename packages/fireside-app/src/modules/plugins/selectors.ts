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

export const getComponentBadges = createSelector(
  (state:State) => state.data,
  plugins => {
    const result = plugins.filter(p => p.type === 'COMPONENT_BADGE')
    return result as pluginEvents.ComponentBadgeEvent[]
  }
)

export const getComponentIcon = createReSelector(
  (state:State) => state.data,
  (_:State, key:string) => key,
  (plugins, key) => plugins.find(p => p.meta.key === key)
)((_, key) => key)

export const getState = (state:State, key:string) => state.states[key]

export const getStates = (state:State) => state.states


// export const getComponentState = (state:State, pluginId:string) => state.states[pluginId]