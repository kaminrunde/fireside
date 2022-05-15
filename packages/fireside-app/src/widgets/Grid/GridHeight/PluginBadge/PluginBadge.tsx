import * as React from 'react'
import styled from 'styled-components'
import {usePluginState} from 'modules/plugins'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'

type Props = {
  pluginKey: string,
  mediaSize: string,
  row: number,
  badge: {
    component: any;
    isActive: (api: any) => boolean;
  }
}

export default React.memo(function PluginBadge (props:Props) {
  const state = usePluginState(props.pluginKey)

  const api:PluginGridRowAPI<any> = {
    state: state.data,
    setState: (data:any) => { state.set(data) },
    mediaSize: props.mediaSize,
    row: props.row,
    story: state.story,
  }

  const isActive = props.badge.isActive(api)
  
  if(!isActive) return null

  return (
    <Wrapper>
      <props.badge.component {...api}/>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  border: 1px solid grey;
  background: white;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg { font-size: 12px;}
`