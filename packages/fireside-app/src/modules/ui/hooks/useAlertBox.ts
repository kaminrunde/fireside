import * as a from '../actions'
import {State} from '../reducer'
import * as s from '../selectors'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  modal: ReturnType<typeof s.getModal>,
  close: typeof a.hideModal
}


type Props = {}

const config:Config<Props,Result,State,unknown> = {
  moduleKey: 'ui',
  name: 'ui/useAlertBox',
  createCacheKey: () => '',
  mapState: state => ({
    modal: s.getModal(state)
  }),
  mapDispatch: {
    close: a.hideModal
  }
}

export default function useAlertBox ():Result {
  const props = {}
  const hook = useConnect(props, config)
  return hook
}