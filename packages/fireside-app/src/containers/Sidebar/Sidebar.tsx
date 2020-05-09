import * as React from 'react'
import styled from 'styled-components'
import {useSidebar} from 'modules/ui'
import {Link} from '@reach/router'

export default function Sidebar () {
  const sidebar = useSidebar()
  return (
    <Wrapper className='Sidebar'>
      {sidebar.isOpen && [
        <div key='overlay' className='overlay' onClick={sidebar.close}/>,
        <div key='content' className='content'>
          <Link className='item' to='/'>
            <div className='icon'></div>
            <div className='label'>COMPONENTS</div>
          </Link>
          <Link className='item' to='/grid/MOBILE_M'>
            <div className='icon'></div>
            <div className='label'>MOBILE M</div>
          </Link>
          <Link className='item' to='/grid/MOBILE_L'>
            <div className='icon'></div>
            <div className='label'>MOBILE L</div>
          </Link>
          <Link className='item' to='/grid/LAPTOP'>
            <div className='icon'></div>
            <div className='label'>LAPTOP</div>
          </Link>
          <Link className='item' to='SETTINGS'>
            <div className='icon'></div>
            <div className='label'>SETTINGS</div>
          </Link>
        </div>
      ]}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .overlay {
    z-index: 10;
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    cursor: pointer;
  }

  > .content {
    z-index: 11;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    width: 300px;
    background: white;

    > .item {
      display: block;
      padding: 10px;
      text-decoration: none;
      color: black;
      cursor: pointer;
      &:hover {background: lightgrey;}
    }
  }
`