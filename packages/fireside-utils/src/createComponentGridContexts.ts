import * as t from './types'

export default function createComponentGridContexts (story:t.RawStory):Record<string,t.GridContext> {
  let dict:Record<string,t.GridContext> = {}

  const areaByIdDict:Record<string,string> = {}
  for(const id in story.componentsById) {
    areaByIdDict[story.componentsById[id].props.gridArea] = id
  }

  let byMediaSize:t.GridContext['byMediaSize'] = {}
  let minRow = 100000000
  let maxRow = 0
  for(const id in story.componentsById) {
    const component = story.componentsById[id]
    for(const ms in story.grids) {
      const grid = story.grids[ms]
      const totalRows = grid.heights.length
      const totalCols = grid.widths.length
      let row = -1
      let col = -1
      let colStretch = 1
      let rowStretch = 1

      
      // calc
      for(let y=0; y<grid.grid.length; y++) for(let x=0; x<grid.grid[y].length; x++) {
        if(grid.grid[y][x] !== areaByIdDict[component.props.gridArea]) continue
        if(row === -1) {
          row = y
        }
        else if(y >= row+rowStretch) {
          rowStretch++
        }
        if(col === -1) {
          row = x
        }
        else if(x >= col+colStretch) {
          colStretch++
        }
        if(minRow > y) minRow = y
        if(maxRow < y) maxRow = y
      }
      if(row !== -1) {
        byMediaSize[ms] = { totalRows, totalCols, row, col, colStretch, rowStretch }
      }
    }
    dict[id] = { minRow, maxRow, byMediaSize }
  }

  return dict
}
