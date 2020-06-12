import * as React from 'react'
import styled from 'styled-components'
import ComponentList from 'widgets/ComponentList'

type Props = {
  path: string
}

export default function IndexRoute (props:Props) {
  return (
    <Wrapper>
      <ComponentList/>
    </Wrapper>
  )
}

const Wrapper = styled.div``