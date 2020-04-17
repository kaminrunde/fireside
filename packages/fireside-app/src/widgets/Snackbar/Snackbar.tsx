import * as React from 'react'
import styled from 'styled-components'
import {useMessages} from 'modules/snackbar'

export default function Snackbar () {
  const messages = useMessages()

  return (
    <Wrapper className='Snackbar'>
      {messages.data.map(msg => (
        <Message type={msg.type}>
          <h5>{msg.title}</h5>
          <p>{msg.content}</p>

        </Message>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  max-width: 400px;
  bottom: 0;
  z-index: 10;
`

const Message = styled.div`
  border-left: 15px solid ${(props:any) => {
    if(props.type === 'error') return '#ec1f10'
    if(props.type === 'info') return '#03a9f4'
    if(props.type === 'warning') return '#ff9800'
  }};
  width: 100%;
  margin: 10px;
  background: #607d8b;
  color: white;
  padding: 10px;
  > h5 {
    margin: 0;
  }
  > p {
    margin: 0;
  }
`

/*
{
type: 'snackbar/ADD_MESSAGE',
payload: {
type: 'error',
title: 'snackbar title',
content: 'snackbar content'
}
}
*/