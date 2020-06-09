import {State} from './reducer'
import * as t from './types'

export const getConnector = (state:State):t.Connector|null => state.connector

export const getStory = (state:State):t.Story|null => state.story