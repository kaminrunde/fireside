import * as s from '../selectors'
import * as a from '../actions'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'


type Input = {
  key: string
}

type Output = {
  data: ReturnType<typeof s.getState>,
  story: ReturnType<typeof s.getStoryWithoutPlugins>
  // states: ReturnType<typeof s.getStates>,
  set: (state:any) => a.SetState 
}

type DP = {
  set: typeof a.setState
}

const config:Config<Input,Output,State,DP> = {
  moduleKey: 'plugins',
  name: 'plugins/usePluginState',
  createCacheKey: input => input.key,
  mapState: (state,input) => ({
    data: s.getState(state, input.key),
    story: s.getStoryWithoutPlugins(state),
  }),
  mapDispatch: {
    set: a.setState
  },
  transformDispatch: {
    set: (fn, sp, input) => (payload:any)  => fn(input.key, payload)
  }
}

export default function usePluginState (key:string):Output {
  const input:Input = { key }
  const hook:Output = useConnect(input, config)
  return hook
}