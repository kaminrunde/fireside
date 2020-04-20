import * as t from './types'

export const SET_STORY:'story/SET_STORY' = 'story/SET_STORY'
export const SET_CONNECTOR:'story/SET_CONNECTOR' = 'story/SET_CONNECTOR'
export const ADD_COMPONENT:'story/ADD_COMPONENT' = 'story/ADD_COMPONENT'
export const REMOVE_COMPONENT:'story/REMOVE_COMPONENT' = 'story/REMOVE_COMPONENT'
export const UPDATE_COMPONENT:'story/UPDATE_COMPONENT' = 'story/UPDATE_COMPONENT'

export const emptyStory:t.Story = {
  componentsById: {},
  allComponents: [],
  grids: {}
}