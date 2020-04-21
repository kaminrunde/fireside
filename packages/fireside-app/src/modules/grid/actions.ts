import * as t from './types'
import * as at from './const'

// export const updateGridArea = (updatedArea:t.GridArea) => ({
//   type: at.UPDATE_GRID_AREA,
//   payload: updatedArea
// })

export const updateGrid = (grid:t.GridArea[]) => ({
  type: at.UPDATE_GRID,
  payload: grid
})

export const addWidth = (width:string='1fr') => ({
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

export const initGrid = (grid:string[][], widths:string[], heights:string[]) => ({
  type: at.INIT_GRID,
  payload: {
    gridAreas:(():t.GridArea[] => {
      let areas:Record<string,t.GridArea> = {}
      for(let y=0; y<grid.length;y++) for (let x=0; x<grid[y].length; x++) {
        const area = grid[y][x]
        if(area === '.') continue
        if(!areas[area]) areas[area] = { x, y, w:1, h:1, i:area }
        else {
          if(x >= areas[area].x+areas[area].w) areas[area].w++
          if(y >= areas[area].y+areas[area].h) areas[area].h++
        }
      }
      return Object.values(areas)
    })(),
    widths,
    heights
  }
})

export type UpdateGrid = ReturnType<typeof updateGrid>
export type AddWidth = ReturnType<typeof addWidth>
export type RemoveWidth = ReturnType<typeof removeWidth>
export type SetWidth = ReturnType<typeof setWidth>
export type SetHeight = ReturnType<typeof setHeight>
export type InitGrid = ReturnType<typeof initGrid>

export type Action =
| InitGrid
| UpdateGrid
| AddWidth
| RemoveWidth
| SetWidth
| SetHeight