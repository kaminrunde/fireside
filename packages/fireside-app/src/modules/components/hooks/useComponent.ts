import * as a from '../actions'
import * as t from '../types'
import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {
  data: ReturnType<typeof s.getComponent>,
  update: (component:t.Component) => ReturnType<typeof a.updateComponent>
}

type Props = {
  componentId: string
}

type DP = {
  update: typeof a.updateComponent
}

const config:Config<Props,Result,State,DP> = {
  moduleKey: 'components',
  name: 'components/useComponent',
  createCacheKey: input => input.componentId,
  mapState: (state, props) => ({
    data: s.getComponent(state, props.componentId),
  }),
  mapDispatch: {
    update: a.updateComponent
  },
  transformDispatch: {
    update: (fn,sp,props) => component => fn(props.componentId, component),
  }
}

/**
 * list of all available components
 */
export default function useComponent (componentId:string):Result {
  const props = {componentId}
  const hook = useConnect<Props,Result,State,object>(props, config)
  return hook
}