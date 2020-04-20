import {State} from './reducer'
import * as t from './types'

export const getConnector = (state:State):t.Connector|null => state