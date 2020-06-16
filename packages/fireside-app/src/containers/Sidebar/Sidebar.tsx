import * as React from 'react'
import styled from 'styled-components'
import {useSidebar} from 'modules/ui'
import {Link} from '@reach/router'
import config from 'config'
import {useActiveMediaSizes} from 'modules/settings'

export default function Sidebar () {
  const sidebar = useSidebar()
  const ms = useActiveMediaSizes()
  return (
    <Wrapper className='Sidebar'>
      {sidebar.isOpen && [
        <div key='overlay' className='overlay' onClick={sidebar.close}/>,
        <div key='content' className='content'>
          <Link className='item' to='/'>
            <div className='icon'></div>
            <div className='label'>COMPONENTS</div>
          </Link>
          {config.mediaSizes.filter(row => ms.data[row.key]).map(ms => (
            <Link key={ms.key} className='item' to={`/grid/${ms.key}`}>
              <div className='icon'></div>
              <div className='label'>{ms.label}</div>
            </Link>
          ))}
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
      font-family: 'Open Sans', sans-serif;
      &:hover {background: lightgrey;}
    }
  }
`