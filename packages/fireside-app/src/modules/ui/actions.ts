import * as at from './const'

export const setSidebarOpen = (open:boolean) => ({
  type: at.SET_SIDEBAR_OPEN,
  payload: open
})

export type SetSidebarOpen = ReturnType<typeof setSidebarOpen>

export type Action = 
| SetSidebarOpen