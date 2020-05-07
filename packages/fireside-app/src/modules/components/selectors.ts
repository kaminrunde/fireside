import * as t from './types'
import {State} from './reducer'

export const getLoadedComponent = (state:State) => state.loadId
  ? state.byId[state.loadId] || null
  : null

export const isLoadingComponent = (state:State) => state.isLoading