import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'
import {PluginComponentAPI} from '@kaminrunde/fireside-utils'
import { useComponent } from "modules/components";


type Props = {
  pluginKey: string,
  componentId: string,
  mediaSize: string,
  icon: {
    component: any;
    isActive: (api: any) => boolean;
    onClick: (api: any) => void;
  }
}

export default function PluginComponent (props:Props) {
  const state = usePluginState(props.pluginKey)
  const component = useComponent(props.componentId)

  const api:PluginComponentAPI<any> = {
    state: state.data,
    setState: (data:any) => { state.set(data) },
    component: component.data,
    mediaSize: props.mediaSize
  }

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    props.icon.onClick(api)
  }

  const isActive = props.icon.isActive(api)

  return (
    <Wrapper onClick={handleClick} active={isActive}>
      <props.icon.component {...api}/>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  width: max-content;
  font-size: 15px;
  background: ${(props) => (props.active ? "#4782B4" : "none")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  padding: 0 15px;
  cursor: pointer;
  border-left: 1px solid lightgrey;
  padding-top: 3px;
  &:first-child {
    border-left: none;
  }
`