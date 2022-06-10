import * as React from 'react'
import styled from 'styled-components'
import { useAlertBox } from 'modules/ui'
import { MdClose } from 'react-icons/md'

export default function AlertBox () {
  const alertBox = useAlertBox()

  if(!alertBox.modal) return null

  return (
    <Wrapper>
      <div className='box'>
        <div className='close-wrapper' onClick={() => alertBox.close('abort')}><MdClose/></div>
        {alertBox.modal.title}
      </div>
      <div className='overlay' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 9;
  }

  > .box {
    position: fixed;
    top: 80px;
    width: 400px;
    padding: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid grey;
    z-index: 10;
    box-shadow: 5px 5px 15px 5px #000000;
    border-radius: 3px;

    > .close-wrapper {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 15px;
      border-radius: 100%;
      background: white;
      border: 1px solid black;
      &:hover {
        background: whitesmoke;
        cursor: pointer;
      }
      > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`