import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'

type Props = {
  component: {
    title: string,
    component: any,
    isActive?: (api:PluginGridRowAPI<any>) => boolean
    pluginKey: string
  },
  extraArgs: {
    mediaSize: string,
    row: number,
  } | {
    mediaSize: string,
    componentId: string
  } | {
    mediaSize: string
  }
}

export default function Component (props:Props) {
  const pluginState = usePluginState(props.component.pluginKey)
  const [state, setState] = React.useState(pluginState.data)
  const initialRender = React.useRef(true)

  const api:PluginGridRowAPI<any> = {
    state: state,
    setState: setState,
    ...props.extraArgs as any
  }

  React.useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false
      return
    }
    pluginState.set(state)
  }, [state])

  if(props.component.isActive && !props.component.isActive(api)) {
    return null
  }
  
  return (
    <Wrapper>
      <h4 className='title'>{props.component.title}</h4>
      <props.component.component {...api}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .title {
    margin: 0;
    font-weight: normal;
    text-transform: uppercase;
    font-family:'Open Sans' sans-serif;
    border-bottom: 1px solid grey;
  }
`