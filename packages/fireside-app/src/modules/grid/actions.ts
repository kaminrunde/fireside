import * as t from './types'
import * as at from './const'

// export const updateGridArea = (updatedArea:t.GridArea) => ({
//   type: at.UPDATE_GRID_AREA,
//   payload: updatedArea
// })

export const updateGrid = (mediaSize:string, grid:t.GridArea[]) => ({
  type: at.UPDATE_GRID,
  meta: {mediaSize},
  payload: grid
})

export const addWidth = (mediaSize:string, width:string='1fr') => ({
  type: at.ADD_WIDTH,
  meta: {mediaSize},
  payload: width
})

export const removeWidth = (mediaSize:string) => ({
  type: at.REMOVE_WIDTH,
  meta: {mediaSize},
})

export const setWidth = (mediaSize:string, index:number, width:string) => ({
  type: at.SET_WIDTH,
  meta: {index, mediaSize},
  payload: width
})

export const setHeight = (mediaSize:string, index:number, height:string) => ({
  type: at.SET_HEIGHT,
  meta: {index, mediaSize},
  payload: height
})

export const init = (grids:{
  [mediaSize:string]: {
    grid: string[][],
    widths: string[],
    heights: string[]
  }
}) => {
  const createGrid = (rows:string[][]) => {
    let areas:Record<string,t.GridArea> = {}
    for(let y=0; y<rows.length;y++) for (let x=0; x<rows[y].length; x++) {
      const area = rows[y][x]
      if(area === '.') continue
      if(!areas[area]) areas[area] = { x, y, w:1, h:1, i:area }
      else {
        if(x >= areas[area].x+areas[area].w) areas[area].w++
        if(y >= areas[area].y+areas[area].h) areas[area].h++
      }
    }
    return Object.values(areas)
  }
  type Result = {
    type: typeof at.INIT,
    payload: Record<string,{
      gridAreas: ReturnType<typeof createGrid>
      widths: string[],
      heights: string[]
    }>
  }
  let action:Result = { type:at.INIT, payload: {} }
  for(let mediaSize in grids){
    action.payload[mediaSize] = {
      gridAreas: createGrid(grids[mediaSize].grid),
      widths: grids[mediaSize].widths,
      heights: grids[mediaSize].heights
    }
  }

  return action
}

export type UpdateGrid = ReturnType<typeof updateGrid>
export type AddWidth = ReturnType<typeof addWidth>
export type RemoveWidth = ReturnType<typeof removeWidth>
export type SetWidth = ReturnType<typeof setWidth>
export type SetHeight = ReturnType<typeof setHeight>
export type Init = ReturnType<typeof init>

export type Action =
| Init
| UpdateGrid
| AddWidth
| RemoveWidth
| SetWidth
| SetHeight