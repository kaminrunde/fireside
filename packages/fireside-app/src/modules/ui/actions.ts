import * as at from './const'
import * as t from './types'

export const clear = () => ({
  type: at.CLEAR
})

export const setSidebarOpen = (open:boolean) => ({
  type: at.SET_SIDEBAR_OPEN,
  payload: open
})

export const showModal = (ctx:t.ModalConfig) => ({
  type: at.SHOW_MODAL,
  payload: ctx
})

export const hideModal = (result:string) => ({
  type: at.HIDE_MODAL,
  payload: result
})

export type Clear = ReturnType<typeof clear>

export type SetSidebarOpen = ReturnType<typeof setSidebarOpen>
export type ShowModal = ReturnType<typeof showModal>
export type HideModal = ReturnType<typeof hideModal>

export type Action = 
| Clear
| SetSidebarOpen
| ShowModal
| HideModal