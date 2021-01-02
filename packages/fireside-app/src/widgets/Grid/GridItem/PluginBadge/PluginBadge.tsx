import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'
import {PluginComponentAPI} from '@kaminrunde/fireside-utils'
import { useComponent } from "modules/components";

type Props = {
  pluginKey: string,
  componentId: string,
  mediaSize: string,
  badge: {
    component: any;
    isActive: (api: any) => boolean;
  }
}

export default function PluginBadge (props:Props) {
  const state = usePluginState(props.pluginKey)
  const component = useComponent(props.componentId)

  const api:PluginComponentAPI<any> = {
    state: state.data,
    setState: (data:any) => { state.set(data) },
    component: component.data,
    mediaSize: props.mediaSize
  }

  const isActive = props.badge.isActive(api)
  
  if(!isActive) return null

  return (
    <Wrapper>
      <props.badge.component/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 5px;
  border: 1px solid grey;
  background: white;
  border-radius: 25px;
  padding: 0 4px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  > svg {
    font-size: 17px;
  }
`