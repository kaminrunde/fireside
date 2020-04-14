import * as a from '../actions'
import * as t from '../types'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'

type Result = {

}

type Props = {}

const config:Config<Props,Result,State,unknown> = {
  moduleKey: 'grid',
  name: 'rgid/useGrid',
  createCacheKey: () => '',
  mapState: state => ({
    data: state
  }),
  mapDispatch: {
    addWidth: a.addWidth,
    removeWidth: a.removeWidth,
    setWidth: a.setWidth,
    setHeight: a.setHeight,
    updateGridArea: a.updateGridArea
  }
}

export default function useGrid ():Result {
  const props = {}
  const hook = useConnect<Props,Result,State,unknown>(props, config)
  return hook
}