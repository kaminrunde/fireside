import * as at from './const'
import {PluginEvent, RawStory} from '@kaminrunde/fireside-utils'

export const init = (story:RawStory) => ({
  type: at.INIT,
  payload: story
})

export const setState = (key:string, state:any) => ({
  type: at.SET_STATE,
  meta: {key},
  payload: state
})

export const setStory = (story:RawStory) => ({
  type: at.SET_STORY,
  payload: story
})

export const setPluginEvents = (events:PluginEvent[]) => ({
  type: at.SET_PLUGIN_EVENTS,
  payload: events
})

export const showModal = (config: {
  title: string
  actionButtons: {
    label: string
    type: 'primary' | 'secondary'
    onClick: () => void
  },
  content: any
  persist?: boolean
}) => ({
  type: at.SHOW_MODAL,
  payload: config
})

export const closeModal = () => ({
  type: at.CLOSE_MODAL,
})

export type Init = ReturnType<typeof init>
export type SetState = ReturnType<typeof setState>
export type SetPluginEvents = ReturnType<typeof setPluginEvents>
export type SetStory = ReturnType<typeof setStory>
export type ShowModal = ReturnType<typeof showModal>
export type CloseModal = ReturnType<typeof closeModal>

export type Action = 
| Init
| SetState
| SetPluginEvents
| SetStory
| ShowModal
| CloseModal