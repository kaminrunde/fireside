import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import * as grid from 'modules/grid'
import * as components from 'modules/components'

/**
 * When the user changes the story
 * Then we want to inform our connector about the change
 */
addRule<
| components.a.Add
| components.a.Remove
| grid.a.AddWidth
| grid.a.RemoveWidth
| grid.a.SetHeight
| grid.a.SetWidth
| grid.a.UpdateGrid
>({
  id: 'feature/UPDATE_CONNECTOR',
  target: [
    components.c.ADD,
    components.c.REMOVE,
    grid.c.ADD_WIDTH,
    grid.c.REMOVE_WIDTH,
    grid.c.SET_HEIGHT,
    grid.c.SET_WIDTH,
    grid.c.UPDATE_GRID
  ],
  output: connector.c.UPDATE_CONNECTOR,
  delay: 500,
  concurrency: 'LAST',
  consequence: (_, {getState}) => {
    const state = getState()
    const componentList = components.s.getComponents(state.components)
    const gridDict = grid.s.getGridDict(state.grid)

    // format components
    let allComponents:string[] = []
    let componentsById:Record<string, components.t.Component> = {}
    componentList.forEach(c => {
      allComponents.push(c.props.gridArea)
      componentsById[c.props.gridArea] = c
    })

    // format grids
    let grids:Record<string,any> = {}
    for(let key in gridDict){
      const {gridAreas, widths, heights} = gridDict[key]
      grids[key] = {
        enabled: true,
        gap: 0,
        grid: formatGrid(gridAreas, heights.length, widths.length),
        widths: widths,
        heights: heights
      }
    }

    let story = { componentsById, allComponents, grids }
    return connector.a.updateConnector(story)
  }
})

function formatGrid (areas:grid.t.GridArea[], height:number,width:number):string[][] {
  let result:string[][] = Array(height).fill(null).map(() => Array(width).fill('.'))
  areas.forEach(area => {
    for (let y=area.y; y<area.y+area.h; y++) {
      for(let x=area.x; x<area.x+area.w; x++) {
        result[y][x] = area.i
      }
    }
  })
  return result
}