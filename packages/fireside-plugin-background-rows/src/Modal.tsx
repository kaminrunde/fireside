import * as React from 'react'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'
import styled from 'styled-components'
import * as t from './types'


type Props = PluginGridRowAPI<t.State> & {
  options: t.Options
}

export default function Modal (props:Props) {
  return (
    <span>
      Hello World
    </span>
    // <Wrapper>
    //   {props.options.colors.map(c => (
    //     <Opt 
    //       key={c.color}
    //       bg={c.color}
    //     />
    //   ))}
    // </Wrapper>
  )
}

const Wrapper = styled.div``

const Opt = styled.div.attrs(p => ({
  style: {
    background: p.bg
  }
}))`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid black;
`