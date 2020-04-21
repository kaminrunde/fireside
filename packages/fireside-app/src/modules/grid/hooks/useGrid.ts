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
  updateGrid: (areas:t.GridArea[]) => a.UpdateGrid
  // updateGridArea: typeof a.updateGridArea
}

type Props = {
  mediaSize: string,
}

const config:Config<Props,Result,State,unknown> = {
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
    updateGrid: a.updateGrid
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
  }
}

export default function useGrid (mediaSize:string):Result {
  const props = {mediaSize}
  const hook = useConnect<Props,Result,State,unknown>(props, config)
  return hook
}