import * as t from './types'

type Config = {
  allIds: string[]
}

export default function formatGrid (grid:t.RawGrid, config:Config) {
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
    result += '> ' + unusedIds.map(s => `.${s}`).join(',') + '{display:none;}'
  }

  for(let name of usedIds){
    result += 
      `>.${name}{` +
        `grid-area: ${gridAreas[name]};` +
        `display: flex;` +
      `}`
  }

  return result
}


// function createCss (story:t.RawStory) {
//   return `
//     @media(min-width:400px){
//       grid-template-rows: auto auto auto;
//       grid-template-columns: 1fr 1fr;
//       grid-gap: 20px;

//       > .Button-1 {
//         grid-area: 1 / 1 / 1 / 1;
//         display: flex;
//       }

//       > .Button-2, .Button-3 {
//         display: none;
//       }
//     }
//   `
// }