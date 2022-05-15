import * as React from 'react'
import {usePluginState} from 'modules/plugins'
import {SettingsPageAPI} from '@kaminrunde/fireside-utils'

type Props = {
  component: any,
  pluginKey: string
}

export default function Component (props:Props) {
  const pluginState = usePluginState(props.pluginKey)
  const [state, setState] = React.useState(pluginState.data)
  const initialRender = React.useRef(true)

  const api:SettingsPageAPI<any> = {
    state: state,
    setState: setState,
    story: pluginState.story
  }

  React.useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false
      return
    }
    pluginState.set(state)
  }, [state])
  
  return (
    <props.component {...api}/>
  )
}