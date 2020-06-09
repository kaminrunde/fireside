import * as t from './types'
import * as at from './const'
import {emptyStory} from './const'

export const updateStory = (story?:t.Story) => ({
  type: at.UPDATE_STORY,
  payload: story || emptyStory
})

export const setConnector = (connector:t.Connector) => ({
  type: at.SET_CONNECTOR,
  payload: connector
})

export const updateConnector = (story:t.Story) => ({
  type: at.UPDATE_CONNECTOR,
  payload: story
})

export type UpdateStory = ReturnType<typeof updateStory>
export type SetConnector = ReturnType<typeof setConnector>
export type UpdateConnector = ReturnType<typeof updateConnector>

export type Action =
| UpdateStory
| SetConnector
| UpdateConnector