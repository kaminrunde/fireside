import * as t from './types'
import * as at from './const'

export const init = (ms:t.MS) => ({
  type: at.INIT,
  payload: {
    activeMediaSizes: ms
  }
})

export const toggleMediaSize = (ms:string) => ({
  type: at.TOGGLE_MEDIA_SIZE,
  payload: ms
})

export type Init = ReturnType<typeof init>
export type ToggleMediaSize = ReturnType<typeof toggleMediaSize>

export type Action = 
| ToggleMediaSize
| Init