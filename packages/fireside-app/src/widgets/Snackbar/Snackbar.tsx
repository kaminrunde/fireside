import * as React from 'react'
import styled from 'styled-components'
import {useMessages} from 'modules/snackbar'

export default function Snackbar () {
  const messages = useMessages()

  return (
    <Wrapper className='Snackbar'>
      {messages.data.map(msg => (
        <div className='message'>
          <h5>{msg.title}</h5>
          <p>{msg.content}</p>
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;

  > .message {
    border: 1px solid black;
    margin: 10px;
    background: white;
  }
`