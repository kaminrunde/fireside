import * as t from './types'

export const UPDATE_STORY:'story/UPDATE_STORY' = 'story/UPDATE_STORY'
export const SET_CONNECTOR:'story/SET_CONNECTOR' = 'story/SET_CONNECTOR'

export const emptyStory:t.Story = {
  componentsById: {},
  allComponents: [],
  grids: {}
}