import * as React from 'react'
import * as t from '../types'
import styled from 'styled-components'

type Props = {
  tabs: {
    tabs: string[],
    activeTab: string,
    setActiveTab: (tab:string) => void
  }
}

export default function Tabs (props:Props) {
  if(props.tabs.tabs.length === 1) return null
  return (
    <Wrapper>
      {props.tabs.tabs.map(tab => (
        <Tab 
          key={tab} 
          active={tab === props.tabs.activeTab}
          children={tab}
          onClick={() => props.tabs.setActiveTab(tab)}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
`

const Tab = styled.button`
  padding: 10px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  ${props => props.active && `
    color: #1da7fd;
    border-bottom: 2px solid #1da7fd;;
    font-weight: bold;
  `}
`