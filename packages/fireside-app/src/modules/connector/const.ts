import * as t from './types'

export const UPDATE_STORY:'connector/UPDATE_STORY' = 'connector/UPDATE_STORY'
export const SET_CONNECTOR:'connector/SET_CONNECTOR' = 'connector/SET_CONNECTOR'

export const emptyStory:t.Story = {
  componentsById: {},
  allComponents: [],
  grids: {}
}