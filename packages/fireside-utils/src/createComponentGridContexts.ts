import * as t from './types'

export default function createComponentGridContexts (story:t.RawStory):Record<string,t.GridContext> {
  let dict:Record<string,t.GridContext> = {}

  for(let id in story.componentsById) {
    const component = story.componentsById[id]
    let minRow = 100000000
    let maxRow = 0
    let byMediaSize:t.GridContext['byMediaSize'] = {}
    for(let ms in story.grids) {
      const grid = story.grids[ms]
      let totalRows = grid.heights.length
      let totalCols = grid.widths.length
      let row = -1
      let col = -1
      let colStretch = 1
      let rowStretch = 1

      // calc
      for(let y=0; y<grid.grid.length; y++) for(let x; x<grid.grid[y].length; x++) {
        if(grid.grid[y][x] !== component.props.gridArea) continue
        if(row === -1) row = y; else rowStretch++
        if(col === -1) col = x; else colStretch ++
        if(minRow > y) minRow = y
        if(maxRow < y) maxRow = y
      }

      byMediaSize[ms] = { totalRows, totalCols, row, col, colStretch, rowStretch }
    }
    dict[id] = { minRow, maxRow, byMediaSize }
  }

  return dict
}
