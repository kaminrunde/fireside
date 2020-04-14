import * as React from 'react'
import styled from 'styled-components'
import {useGrid} from 'modules/grid'

export default function Grid () {
  const grid = useGrid()
  console.log(grid)
  return (
    <Wrapper className='Grid'>
      Grid
    </Wrapper>
  )
}

const Wrapper = styled.div``