import * as t from './types'
import * as at from './const'

export const addMessage = (message:t.Message) => ({
  type: at.ADD_MESSAGE,
  payload: message
})

export const removeMessage = (message:t.Message) => ({
  type: at.REMOVE_MESSAGE,
  payload: message
})

export type AddMessage = ReturnType<typeof addMessage>
export type RemoveMessage = ReturnType<typeof removeMessage>

export type Action =
| AddMessage
| RemoveMessage