import * as React from 'react'
import styled from 'styled-components'
import {ActionButtonsDisplay} from 'widgets/ActionButtons'
import { FiMenu } from "react-icons/fi"
import {MdClose, MdFullscreen} from 'react-icons/md'
import {useSidebar} from 'modules/ui'
import toggleFullscreen from 'toggle-fullscreen'


export default function Header () {
  const sidebar = useSidebar()
  const handleFullscreenClick = () => {
    toggleFullscreen(document.body)
  }
  return (
    <>
      <Offset/>,
      <Wrapper>
        <div className='burger-menu' onClick={sidebar.isOpen ? sidebar.close : sidebar.open}>
          {sidebar.isOpen ? <MdClose/> : <FiMenu/>}
        </div>
        <div className='logo'></div>
        <div className='title'></div>
        <ActionButtonsDisplay/>
        <div className='fullscreen' onClick={handleFullscreenClick}>
          <MdFullscreen/>
        </div>
      </Wrapper>
    </>
  )
}

const Offset = styled.div`
  height: 60px;
  width: 100%;
`

const Wrapper = styled.div`
  height: 60px;
  background: steelblue;
  display: flex;
  position: fixed;
  z-index: 99999;
  left: 0;
  right:0;
  top: 0;

  > .burger-menu {
    cursor: pointer;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    > svg {
      margin-left: 15px;
      color: white;
      font-size: 30px;
    }
  }
  > .logo {width: 100px;}
  > .title {flex:1;}
  > .ActionButtonsDisplay {}
  > .fullscreen {
    cursor: pointer;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    > svg {
      margin-left: 15px;
      color: white;
      font-size: 30px;
    }
  }
`