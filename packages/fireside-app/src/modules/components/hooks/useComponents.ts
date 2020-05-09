import * as a from '../actions'
// import * as t from '../types'
import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  data: ReturnType<typeof s.getComponents>,
}

type Props = {}

const config:Config<Props,Result,State,never> = {
  moduleKey: 'components',
  name: 'components/useComponents',
  createCacheKey: () => '',
  mapState: state => ({
    data: s.getComponents(state),
  }),
}

/**
 * list of all available components
 */
export default function useLoadingComponent ():Result {
  const props = {}
  const hook = useConnect<Props,Result,State,never>(props, config)
  return hook
}