import * as a from '../actions'
import * as t from '../types'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'


type Result = {
  data: t.Message,
  set: typeof a.setMessage,
  clear: typeof a.clearMessage
}

type Props = {}

const config:Config<Props,Result,State,object> = {
  moduleKey: 'modal',
  name: 'modal/useMessage',
  createCacheKey: () => '',
  mapState: state => ({
    data: state
  }),
  mapDispatch: {
    setMessage: a.setMessage,
    clearMessage: a.clearMessage,
  }
}

export default function useMessage ():Result {
  const props:Props = {}
  const hook:Result = useConnect(props, config)
  return hook
}