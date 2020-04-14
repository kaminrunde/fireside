import * as React from 'react'
import styled from 'styled-components'
import Grid from 'widgets/Grid'

type Props = {
  path: string
}

export default function IndexRoute (props:Props) {
  return (
    <Wrapper>
      Index Route
      <Grid/>
    </Wrapper>
  )
}

const Wrapper = styled.div``