import * as t from './types'
import {State} from './reducer'
import {createSelector} from 'reselect'

export const getLoadedComponent = (state:State) => state.loadId
  ? state.byId[state.loadId] || null
  : null

export const isLoadingComponent = (state:State) => state.isLoading

export const getComponents = createSelector(
  (state:State) => state.allIds,
  (state:State) => state.byId,
  (allIds, byId) => allIds.map(id => byId[id])
)

export const getComponent = (state:State, id:string) => state.byId[id]