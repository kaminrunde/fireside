import * as t from './types'
import * as at from './const'
import {emptyStory} from './const'

export const setStory = (story?:t.Story) => ({
  type: at.SET_STORY,
  payload: story || emptyStory
})

export const setConnector = (connector:t.Connector) => ({
  type: at.SET_CONNECTOR,
  payload: connector
})

export type Action =
| ReturnType<typeof setStory>
| ReturnType<typeof setConnector>