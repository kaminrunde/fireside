import * as a from '../actions'
import {State} from '../reducer'
import * as s from '../selectors'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  data: State,
  add: typeof a.addMessage,
  remove: typeof a.removeMessage
}

type Props = {}

const config:Config<Props,Result,State,unknown> = {
  moduleKey: 'snackbar',
  name: 'snackbar/useMessages',
  createCacheKey: () => '',
  mapState: state => ({
    data: s.getMessages(state)
  }),
  mapDispatch: {
    add: a.addMessage,
    remove: a.removeMessage
  }
}

export default function useGrid ():Result {
  const props = {}
  const hook = useConnect<Props,Result,State,unknown>(props, config)
  return hook
}