import * as t from './types'

type Config = {
  allIds: string[]
  gridAreas: Record<string, string>
}

export default function formatGrid (grid:t.RawGrid, config:Config) {
  if(!grid.enabled) return ''
  const idDict:Record<string,string> = {}
  for(let row of grid.grid) for(let col of row) {
    idDict[col] = col
  }
  let usedIds:string[] = []
  let unusedIds:string[] = []

  for (let name of config.allIds) {
    if(name in idDict) usedIds.push(name)
    else unusedIds.push(name)
  }

  const gridAreasRaw:Record<string,[[number,number],[number,number]]> = {}
  const gridAreas:Record<string,string> = {}
  grid.grid.forEach((row,i) => row.forEach((area,j) => {
    if(!gridAreasRaw[area]) gridAreasRaw[area] = [[i+1, j+1],[i+2,j+2]]
    gridAreasRaw[area][1][0] = i+2
    gridAreasRaw[area][1][1] = j+2
  }))
  for(let name in gridAreasRaw){
    const c = gridAreasRaw[name]
    gridAreas[name] = `${c[0][0]}/${c[0][1]}/${c[1][0]}/${c[1][1]}`
  }

  let result = 
    `grid-template-columns:${grid.widths.join(' ')};` +
    `grid-template-rows:${grid.heights.join(' ')};` +
    `grid-gap:${grid.gap}px;`

  if (unusedIds.length) {
    result += '>' + unusedIds.map(id => `.${config.gridAreas[id]}`).join(',>') + '{display:none;}'
  }

  for(let id of usedIds){
    result += 
      `>.${config.gridAreas[id]}{` +
        `grid-area:${gridAreas[id]};` +
        `display:flex;` +
      `}`
  }

  return result
}
