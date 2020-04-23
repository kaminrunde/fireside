import * as a from '../actions'
// import * as t from '../types'
import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  isLoading: ReturnType<typeof s.isLoadingComponent>,
  data: ReturnType<typeof s.getLoadedComponent>,
  unload: a.Unload,
  add: a.Add
}

type Props = {}

const config:Config<Props,Result,State,unknown> = {
  moduleKey: 'components',
  name: 'components/useLoadingComponent',
  createCacheKey: () => '',
  mapState: state => ({
    data: s.getLoadedComponent(state),
    isLoading: s.isLoadingComponent(state)
  }),
  mapDispatch: {
    load: a.load,
    unload: a.unload
  },
}

export default function useLoadingComponent ():Result {
  const props = {}
  const hook = useConnect<Props,Result,State,unknown>(props, config)
  return hook
}