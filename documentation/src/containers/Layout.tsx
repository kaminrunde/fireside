import * as React from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'

export default function Layout (props:{children:any}) {
  return (
    <Wrapper>
      <GlobalStyle />
      <header />
      <div className='content'>
        <aside/>
        <div>{props.children}</div>
      </div>      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  header {
    height: 50px;
    background: steelblue;
    margin-bottom: 15px;
  }

  .content {
    display: flex;
    padding: 10px;
    margin: 0 auto;
    max-width: fit-content;
    
    > aside {
      display: none;
      width: 300px;
      margin-right: 20px;
      height: 400px;
      border: 1px solid grey;
      border-radius: 8px;
      
      @media (min-width: 1100px) {
        display: block;
      }
    }
    
    > div {
      flex: 1;
      max-width: 700px;
      background: whitesmoke;

      @media (min-width: 720px) {
        width: 700px;
      }
    }
  }
`