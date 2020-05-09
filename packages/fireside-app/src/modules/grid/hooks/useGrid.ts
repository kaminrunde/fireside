import * as a from '../actions'
import * as t from '../types'
import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  data: t.Grid,
  addWidth: (width?:string) => a.AddWidth,
  removeWidth: () => a.RemoveWidth,
  setWidth: (index:number, width:string) => a.SetWidth,
  setHeight: (index:number, height:string) => a.SetHeight,
  updateGrid: (areas:t.GridArea[]) => a.UpdateGrid,
  addFromBuffer: (area:t.GridArea) => a.AddFromBuffer
  // updateGridArea: typeof a.updateGridArea
}

type DP = {
  addWidth: typeof a.addWidth,
  removeWidth: typeof a.removeWidth,
  setWidth: typeof a.setWidth,
  setHeight: typeof a.setHeight,
  updateGrid: typeof a.updateGrid,
  addFromBuffer: typeof a.addFromBuffer
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
    addFromBuffer: a.addFromBuffer
  },
  transformDispatch: {
    addWidth: (fn:typeof a.addWidth,sp,props) => 
      (width?:string) => fn(props.mediaSize, width),
    removeWidth: (fn:typeof a.removeWidth,sp,props) => 
      () => fn(props.mediaSize),
    setWidth: (fn:typeof a.setWidth,sp,props) => 
      (index:number,width:string) => fn(props.mediaSize,index,width),
    setHeight: (fn:typeof a.setHeight,sp,props) => 
      (index:number,height:string) => fn(props.mediaSize,index,height),
    updateGrid: (fn:typeof a.updateGrid,sp,props) => 
      (areas:t.GridArea[]) => fn(props.mediaSize,areas),
    addFromBuffer: (fn:typeof a.addFromBuffer,sp,props) => 
      (area:t.GridArea) => fn(props.mediaSize,area),
  }
}

export default function useGrid (mediaSize:string):Result {
  const props = {mediaSize}
  const hook = useConnect<Props,Result,State,DP>(props, config)
  return hook
}