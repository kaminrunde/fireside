import * as React from 'react'
import styled from 'styled-components'
import toggleFullscreen, {isFullscreen} from 'toggle-fullscreen'

export default function EnforceFullscreen () {
  const [full, setFull] = React.useState(isFullscreen())
  const [rejected,setRejected] = React.useState(false)
  const handleFullscreen = () => {
    setFull(true)
    toggleFullscreen(document.body)
  }
  const reject = () => setRejected(true)

  if(full || rejected) return null
  return null
  // return (
  //   <Wrapper>
  //     <button className='primary' onClick={handleFullscreen}>Open Story Fullscreen</button>
  //     <button className='secondary' onClick={reject}>open without fullscreen</button>
  //   </Wrapper>
  // )
}

const Wrapper = styled.div`
  z-index: 999;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > .primary {
    margin: 20px;
    width: 100%;
    max-width: 600px;
    font-size: 24px;
    border: none;
    background: #8bc34a;
    padding: 15px;
    text-transform: uppercase;
    color: whitesmoke;
    cursor: pointer;
  }

  > .secondary {
    color: #8bc34a;
    font-weight: bold;
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
  }
`