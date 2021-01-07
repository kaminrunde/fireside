import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'

type Props = {
  component: {
    title: string,
    component: any,
    pluginKey: string
  },
  extraArgs: {
    mediaSize: string,
    row: number,
  } | {
    mediaSize: string,
    componentId: string
  }
}

export default function Component (props:Props) {
  const state = usePluginState(props.component.pluginKey)

  const api:PluginGridRowAPI<any> = {
    state: state.data,
    setState: (data:any) => { state.set(data) },
    ...props.extraArgs as any
  }
  return (
    <Wrapper>
      <h4 className='title'>{props.component.title}</h4>
      <props.component.component api={api}/>
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