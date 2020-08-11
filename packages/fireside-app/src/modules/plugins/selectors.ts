import {State} from './reducer'
import {createSelector} from 'reselect'

export const getComponentIconPlugins = createSelector(
  (state:State) => state.data,
  plugins => plugins
    .filter(p => !!p.extendComponent?.icon)
)


export const getComponentState = (state:State, pluginId:string) => state.states[pluginId]