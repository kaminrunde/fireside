import * as React from 'react'
import styled from 'styled-components'
import Grid from 'widgets/Grid'

type Props = {
  path: string,
  mediaSize: string
}

export default function IndexRoute (props:Props) {
  console.log(props)
  return (
    <Wrapper>
      Grid Routes
      <Grid/>
    </Wrapper>
  )
}

const Wrapper = styled.div``