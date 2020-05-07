import * as a from '../actions'
import {State} from '../reducer'
import * as s from '../selectors'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  isOpen: ReturnType<typeof s.isSidebarOpen>,
  open: () => void,
  close: () => void
}

type DP = {
  open: typeof a.setSidebarOpen,
  close: typeof a.setSidebarOpen
}

type Props = {}

const config:Config<Props,Result,State,DP> = {
  moduleKey: 'ui',
  name: 'ui/useSidebar',
  createCacheKey: () => '',
  mapState: state => ({
    isOpen: s.isSidebarOpen(state)
  }),
  mapDispatch: {
    open: a.setSidebarOpen,
    close: a.setSidebarOpen
  },
  transformDispatch: {
    open: fn => () => fn(true),
    close: fn => () => fn(false)
  }
}

export default function useGrid ():Result {
  const props = {}
  const hook = useConnect(props, config)
  return hook
}