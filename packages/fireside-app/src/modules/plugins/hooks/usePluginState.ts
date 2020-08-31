import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'


type Input = {
  key: string
}

type Output = {
  data: ReturnType<typeof s.getState>,
  // states: ReturnType<typeof s.getStates>,
  // setState: (state:any) => void
}

const config:Config<Input,Output,State,object> = {
  moduleKey: 'plugins',
  name: 'plugins/usePluginState',
  createCacheKey: input => input.key,
  mapState: (state,input) => ({
    data: s.getState(state, input.key),
  })
}

export default function usePluginState (key:string):Output {
  const input:Input = { key }
  const hook:Output = useConnect(input, config)
  return hook
}