import * as t from './types'
import * as at from './const'

export const updateGridArea = (updatedArea:t.GridArea) => ({
  type: at.UPDATE_GRID_AREA,
  payload: updatedArea
})

export const addWidth = (width:string='auto') => ({
  type: at.ADD_WIDTH,
  payload: width
})

export const removeWidth = () => ({
  type: at.REMOVE_WIDTH
})

export const setWidth = (index:number, width:string) => ({
  type: at.SET_WIDTH,
  meta: {index},
  payload: width
})

export const setHeight = (index:number, height:string) => ({
  type: at.SET_HEIGHT,
  meta: {index},
  payload: height
})

export type Action =
| ReturnType<typeof updateGridArea>
| ReturnType<typeof addWidth>
| ReturnType<typeof removeWidth>
| ReturnType<typeof setWidth>
| ReturnType<typeof setHeight>