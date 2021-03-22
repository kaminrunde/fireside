import * as a from '../actions'
import * as t from '../types'
import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'
import store from 'store'

// type OmitParam1<T> = 
// T extends (arg1:any, ...args: infer Args) => infer R ? (...args:Args) => R : never

type Result = {
  data: t.Grid,
  addWidth: (width?:string) => a.AddWidth,
  removeWidth: () => a.RemoveWidth,
  setWidth: (index:number, width:string) => a.SetWidth,
  setHeight: (index:number, height:string) => a.SetHeight,
  updateGrid: (areas:t.GridArea[]) => a.UpdateGrid,
  addFromBuffer: (area:t.GridArea) => a.AddFromBuffer,
  toBuffer: (area:t.GridArea) => a.ToBuffer
  clearGrid: () => a.ClearGrid
  copyGridFrom: (mediaSize:string) => a.CopyGrid
  // updateGridArea: typeof a.updateGridArea
}

type DP = {
  addWidth: typeof a.addWidth,
  removeWidth: typeof a.removeWidth,
  setWidth: typeof a.setWidth,
  setHeight: typeof a.setHeight,
  updateGrid: typeof a.updateGrid,
  addFromBuffer: typeof a.addFromBuffer,
  toBuffer: typeof a.toBuffer,
  clearGrid: typeof a.clearGrid,
  copyGridFrom: typeof a.copyGrid
}

type Props = {
  mediaSize: string,
}

const config:Config<Props,Result,State,DP> = {
  moduleKey: 'grid',
  name: 'grid/useGrid',
  createCacheKey: props => props.mediaSize,
  mapState: (state,props) => ({
    data: s.getGrid(state,props.mediaSize)
  }),
  mapDispatch: {
    addWidth: a.addWidth,
    removeWidth: a.removeWidth,
    setWidth: a.setWidth,
    setHeight: a.setHeight,
    updateGrid: a.updateGrid,
    addFromBuffer: a.addFromBuffer,
    toBuffer: a.toBuffer,
    copyGridFrom: a.copyGrid,
    clearGrid: a.clearGrid
  },
  transformDispatch: {
    addWidth: (fn,sp,props) => width => fn(props.mediaSize, width),
    removeWidth: (fn,sp,props) => () => fn(props.mediaSize),
    setWidth: (fn,sp,props) => (index,width) => fn(props.mediaSize,index,width),
    setHeight: (fn,sp,props) => (index,height) => fn(props.mediaSize,index,height),
    updateGrid: (fn,sp,props) => areas => fn(props.mediaSize,areas),
    addFromBuffer: (fn,sp,props) => area => fn(props.mediaSize,area),
    toBuffer: (fn,sp,props) => area => fn(props.mediaSize, area),
    copyGridFrom: (fn,sp,props) => mediaSize  => fn(mediaSize, props.mediaSize),
    clearGrid: (fn,sp,props) => () => fn(props.mediaSize),
  }
}

export default function useGrid (mediaSize:string):Result {
  const props = {mediaSize}
  const hook = useConnect<Props,Result,State,DP>(props, config)
  return hook
}