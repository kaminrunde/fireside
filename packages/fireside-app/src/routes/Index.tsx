import * as React from 'react'
import styled from 'styled-components'
import {Link} from '@reach/router'

type Props = {
  path: string
}

export default function IndexRoute (props:Props) {
  return (
    <Wrapper>
      Index Route
      <br/><Link to='/grid/MOBILE_M'>MOBILE_M</Link>
      <br/><Link to='/grid/MOBILE_L'>MOBILE_L</Link>
      <br/><Link to='/grid/LAPTOP'>LAPTOP</Link>
    </Wrapper>
  )
}

const Wrapper = styled.div``