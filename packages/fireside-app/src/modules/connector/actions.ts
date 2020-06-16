import * as t from './types'
import * as at from './const'
import {emptyStory} from './const'
import config from 'config'

export const updateStory = (story?:t.Story) => {
  const target = story || emptyStory
  const defaultGrids = config.mediaSizes.reduce<any>((prev,next) => {
    prev[next.key] = {
      enabled: next.initialyActive || false,
      gap: next.gap,
      grid: [[]],
      widths: ['1fr'],
      heights: ['auto']
    }
    return prev
  },{})
  target.grids = {
    ...defaultGrids,
    ...target.grids,
  }
  return {
    type: at.UPDATE_STORY,
    payload: target
  }
}

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