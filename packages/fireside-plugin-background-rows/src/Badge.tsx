import * as React from 'react'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'
import styled from 'styled-components'
import * as t from './types'


type Props = PluginGridRowAPI<t.State> & {
  options: t.Options
}

export default function Badge (props:Props) {
  try {
    const label = props.state[props.mediaSize][props.row]
    const color = props.options.colors.find(c => c.label === label)
    return (
      <Wrapper bg={color.color}/>
    )
  }
  catch(e) {
    return null
  }
}

const Wrapper = styled.div.attrs(p => ({
  style: {
    background: p.bg
  }
}))`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`