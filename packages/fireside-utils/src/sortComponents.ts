import * as t from './types'

/**
 * We need to sort the compnents by their order in DOM. The browser starts rendering 
 * as soon as there are 20 000 chars of the DOM available. for large stories this could 
 * be problematic, because the first displayed component does not need to be the first in the
 * DOM (css-grid). this could lead to browser flickering
 * 
 * The sorting logic:
 * - we think in rows!
 * - each componen should be at the position where it is in the DOM
 * - when two media-sizes have he same component at different row, 
 */
export default function sortComponents (story:t.RawStory) {
  const byRowWithMedia = {}
  const byRow = {}

  for(const ms in story.grids) {
    byRowWithMedia[ms] = {}
    const grid = story.grids[ms]
    for(let row=0;row<grid.grid.length;row++) {
      for(const id of grid.grid[row]) {
        if(id in byRowWithMedia[ms]) continue
        byRowWithMedia[ms][id] = row
      }
    }
  }

  for(const id of story.allComponents) {
    for(const ms in story.grids) {
      
    }
  }

  const sortedComponents = story.allComponents.sort((a,b) => {

  })

  return story
}