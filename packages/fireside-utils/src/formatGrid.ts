import * as t from './types'

type Config = {
  // byId: Record<string,t.Component>
}

export default function formatGrid (grid:t.RawGrid, config:Config) {
  return grid
  // const idDict:Record<string,string> = {}
  // for(let row of grid.grid) for(let col of row) {
  //   idDict[col] = col
  // }
  // let usedIds:string[] = []
  // let unusedIds:string[] = []

  // for (let name in config.byId) {
  //   if(name in idDict) usedIds.push(name)
  //   else unusedIds.push(name)
  // }

  // const result = {
  //   widths: grid.widths,
  //   heights: grid.heights,
  //   gap: grid.gap,
  //   active: usedIds,
  //   inactive: unusedIds
  // }

  // return `
  //   grid-template-columns: ${grid.widths.join(' ')};
  //   grid-template-rows: ${grid.heights.join(' ')};
  //   grid-gap: ${grid.gap}px;

  // `
}