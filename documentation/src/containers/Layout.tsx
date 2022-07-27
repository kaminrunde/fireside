import * as React from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import MDXStyle from './MDXStyle'
import {Helmet} from 'react-helmet'

export default () => function Layout (props:{children:any}) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
      </Helmet>
      <header />
      <div className='content'>
        <aside>
          <h3>Introduction</h3>
          <div>Overview</div>
          <div>Component Lifecycle</div>
          <div>Setup</div>
          <h3>Controllers</h3>
          <div>Add Context</div>
          <div>Transform Shape</div>
          <div>Add Events to Story</div>
          <div>Version Handling</div>
          <h3>Knobs</h3>
          <div>Existing Knobs</div>
          <div>Create own Knob</div>
          <h3>Plugins</h3>
          <div>Add Plugins</div>
          <div>Create Own Plugin</div>
        </aside>
        <MDXStyle>{props.children}</MDXStyle>
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
      min-height: 300px;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 10px;
      padding-bottom: 50px;

      h3 {
        margin: 10px 0;
      }

      div {
        margin-left: 10px;
      }
      
      @media (min-width: 1100px) {
        display: block;
      }
    }
    
    > div {
      flex: 1;
      max-width: 700px;

      @media (min-width: 720px) {
        width: 700px;
      }
    }
  }
`