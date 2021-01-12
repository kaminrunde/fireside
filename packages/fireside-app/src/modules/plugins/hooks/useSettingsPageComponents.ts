import * as s from '../selectors'
import {State} from '../reducer'
import useConnect, {Config} from 'hooks/useConnect'


type Input = {}

type Output = {
  data: ReturnType<typeof s.getSettingsPageComponents>,
}

const config:Config<Input,Output,State,object> = {
  moduleKey: 'plugins',
  name: 'plugins/useSettingsPageComponents',
  createCacheKey: () => '',
  mapState: state => ({
    data: s.getSettingsPageComponents(state),
  })
}

export default function useSettingsPageComponents ():Output {
  const input:Input = {}
  const hook:Output = useConnect(input, config)
  return hook
}