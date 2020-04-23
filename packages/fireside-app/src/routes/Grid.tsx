import * as React from 'react'
import styled from 'styled-components'
import Grid from 'widgets/Grid'

type Props = {
  path: string,
  mediaSize: string
}

export default function GridRoute (props:Props) {
  return (
    <Wrapper>
      <Grid mediaSize={props.mediaSize}/>
    </Wrapper>
  )
}

const Wrapper = styled.div``