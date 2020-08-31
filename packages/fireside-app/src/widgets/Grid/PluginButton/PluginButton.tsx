import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'

type Props = {
  pluginKey: string,
  icon: {
    component: any;
    isActive: (api: any) => boolean;
    onClick: (api: any) => void;
  }
}

export default function PluginComponent (props:Props) {
  const state = usePluginState(props.pluginKey)

  console.log(state)

  const api = {
    
  }
  return (
    <Wrapper>
      <props.icon.component/>
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