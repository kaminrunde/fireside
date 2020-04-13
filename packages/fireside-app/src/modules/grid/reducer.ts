import * as t from './types'
import produce from 'immer'

export type State = {
  gridAreas: t.GridArea[],
  widths: number[],
  heights: number[]
}

export default function reducer (state:State, action:any) {
  switch(action.type) {
    default: return state
  }
}
