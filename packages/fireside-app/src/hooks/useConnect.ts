// @flow
import * as React from 'react'
import {bindActionCreators} from 'redux'
import store from 'store'

type State = any

interface CustomFunction extends Function {
  updateList: Function[]
}

export type Config<OP,Result,State,SP> = {
  moduleKey:string,
  name:string,
  createCacheKey: (props:OP) => string,
  mapState: (state:State,props:OP) => SP,
  mapDispatch?:any,
  transformDispatch?:{
    [name:string]: (fn:Function,sp:Result,props:OP)=>void
  },
  areStatesEqual?: (a:State,b:State) => boolean
}

const cache:{[name:string]:[any,any]} = {}
const creators:any = {}
const listeners:CustomFunction[] = []
// TODO: not used?
const dict:{[key:string]:CustomFunction[]} = {}
const cbDict:{[key:string]:CustomFunction} = {}
let setup = false
const dispatch:any = store.dispatch

function runSetup (){
  setup = true
  store.subscribe(() => {
    const state = store.getState()
    for(let i=0;i<listeners.length;i++){
      listeners[i](state, (state:State) => {
        for(let j=0;j<listeners[i].updateList.length;j++){
          listeners[i].updateList[j](state)
        }
      })
    }
  })
}



export function removeItem <Item>(list:Item[], item:Item) {
  let i, j

  for (i = 0, j = 0; i < list.length; ++i) {
    if (item !== list[i]) {
      list[j] = list[i]
      j++
    }
  }

  if(j < i) list.pop()
}

function subscribe (
  cacheKey:string, 
  update:Function, 
  cb:any
) {
  if(!dict[cacheKey]){
    dict[cacheKey] = []
    listeners.push(cb)
    cbDict[cacheKey] = cb
    cb.updateList = [update]
  }
  else {
    cb = cbDict[cacheKey]
    cb.updateList.push(update)
  }
  return () => {
    if(cb.updateList.length === 1){
      removeItem(listeners, cbDict[cacheKey])
    }
    else {
      removeItem(cb.updateList, update)
    }
  }
}

export default function useBetterConnect <OP,Result,State,SP>(
  props:OP,
  m:Config<OP,Result,State,SP>
):Result {
  if(!setup) runSetup()
  const rootState:any = store.getState()
  const state:State = rootState[m.moduleKey]
  const [,update] = React.useState(0)
  const cacheKey = m.name + m.createCacheKey(props)
  const cachedData = cache[cacheKey]
  const savedCacheKey = React.useRef('')
  let cachedState:State|null = null
  let cachedResult:Result|null = null
  if(cachedData){
    cachedState = cachedData[0]
    cachedResult = cachedData[1]
  }
  savedCacheKey.current = cacheKey

  React.useLayoutEffect(() => subscribe(cacheKey, update, (state:any,update:Function) => {
    const mstate:any = state[m.moduleKey]
    const cachedData = cache[savedCacheKey.current]
    if(!cachedData) {
      update(mstate)
      return
    }
    if (mstate === cachedData[0]) return
    if(m.areStatesEqual && m.areStatesEqual(mstate, cachedData[0])) return
    update(mstate)
  }),[cacheKey, m])

  if(cachedResult && cachedState === state){
    return cachedResult
  }

  if(!creators[m.name]){
    creators[m.name] = bindActionCreators(m.mapDispatch||{}, dispatch)
  }

  const dp = creators[m.name]
  let result:any = m.mapState(state, props)

  for(let name in dp) result[name] = dp[name]
  
  if(m.transformDispatch){
    for(let name in m.transformDispatch) {
      const fn = m.transformDispatch[name]
      result[name] = fn(result[name],result,props)
    }
  }
  cache[cacheKey] = [state,result]
  return result
}