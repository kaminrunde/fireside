import * as at from './const'

export const clear = () => ({
  type: at.CLEAR
})

export const setSidebarOpen = (open:boolean) => ({
  type: at.SET_SIDEBAR_OPEN,
  payload: open
})

export type Clear = ReturnType<typeof clear>

export type SetSidebarOpen = ReturnType<typeof setSidebarOpen>

export type Action = 
| Clear
| SetSidebarOpen