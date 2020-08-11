import {createHash} from 'crypto-browserify'
import {addRule} from 'redux-ruleset'
import * as connector from 'modules/connector'
import * as grid from 'modules/grid'
import * as components from 'modules/components'
import * as settings from 'modules/settings'

/**
 * When the user changes the story
 * Then we want to inform our connector about the change
 */
addRule<
| components.a.Add
| components.a.Remove
| components.a.UpdateComponet
| grid.a.AddWidth
| grid.a.RemoveWidth
| grid.a.SetHeight
| grid.a.SetWidth
| grid.a.UpdateGrid
| settings.a.ToggleMediaSize
>({
  id: 'feature/UPDATE_CONNECTOR',
  target: [
    components.c.ADD,
    components.c.REMOVE,
    components.c.UPDATE_COMPONENT,
    grid.c.ADD_WIDTH,
    grid.c.REMOVE_WIDTH,
    grid.c.SET_HEIGHT,
    grid.c.SET_WIDTH,
    grid.c.UPDATE_GRID,
    settings.c.TOGGLE_MEDIA_SIZE
  ],
  output: connector.c.UPDATE_CONNECTOR,
  delay: 500,
  concurrency: 'LAST',
  consequence: (_, {getState}) => {
    const state = getState()
    const prevStory = connector.s.getStory(state.connector)
    const componentList = components.s.getComponents(state.components)
    const gridDict = grid.s.getGridDict(state.grid)
    const activeMs = settings.s.getActiveMediaSizes(state.settings)

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
      const {gridAreas, widths, heights, gap} = gridDict[key]
      grids[key] = {
        enabled: activeMs[key] || false,
        gap: gap,
        grid: formatGrid(gridAreas, heights.length, widths.length),
        widths: widths,
        heights: heights
      }
    }
    const VERSION:'1.0.0' = '1.0.0'
    let story = { version: VERSION, componentsById, allComponents, grids, hash:'' }
    const hash = createHash('md5').update(JSON.stringify(story)).digest('hex')
    story.hash = hash

    // do not update if hash did not change
    if(story.hash === prevStory?.hash){
      return
    }
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