import * as t from './types'

export const UPDATE_STORY:'connector/UPDATE_STORY' = 'connector/UPDATE_STORY'
export const SET_CONNECTOR:'connector/SET_CONNECTOR' = 'connector/SET_CONNECTOR'
export const UPDATE_CONNECTOR:'connector/UPDATE_CONNECTOR' = 'connector/UPDATE_CONNECTOR'

export const emptyStory:t.Story = {
  hash: '',
  componentsById: {},
  allComponents: [],
  grids: {}
}