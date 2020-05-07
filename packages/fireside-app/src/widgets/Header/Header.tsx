import * as React from 'react'
import styled from 'styled-components'
import {ActionButtonsDisplay} from 'widgets/ActionButtons'

export default function Header () {
  return (
    <Wrapper>
      <div className='logo'></div>
      <div className='title'></div>
      <ActionButtonsDisplay/>
      <div className='fullscreen'></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 60px;
  background: steelblue;
  display: flex;

  > .logo {width: 100px;}
  > .title {flex:1;}
  > .ActionButtonsDisplay {}
  > .fullscreen {width: 50px;}
`