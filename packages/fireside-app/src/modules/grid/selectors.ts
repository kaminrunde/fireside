import {State} from './reducer'
import * as t from './types'

const emptyGrid:t.Grid = {
  gridAreas: [],
  widths: ['1fr'],
  heights: ['auto'],
  buffer: []
}

export const getGrid = (state:State, mediaSize:string):t.Grid => state[mediaSize] || emptyGrid