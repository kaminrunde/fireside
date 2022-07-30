import * as React from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import MDXStyle from './MDXStyle'
import {Helmet} from 'react-helmet'
import {Link} from 'gatsby'

export default () => function Layout (props:{children:any}) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Open+Sans:wght@300;500&display=swap" rel="stylesheet"/>
      </Helmet>
      <header />
      <div className='content'>
        <aside>
          <h3><Link to='/docs/introduction'>Introduction</Link></h3>
          <h4><Link to='/docs/introduction-overview'>Overview</Link></h4>
          <h4><Link to='/docs/introduction-componentlifecycle'>Component Lifecycle</Link></h4>
          <h4><Link to='/docs/introduction-setup'>Setup</Link></h4>
          <h3><Link to='/docs/controllers'>Controllers</Link></h3>
          <h4><Link to='/docs/controllers-addcontext'>Add Context</Link></h4>
          <h4><Link to='/docs/controllers-transformshape'>Transform Shape</Link></h4>
          <h4><Link to='/docs/controllers-addeventstostory'>Add Events to Story</Link></h4>
          <h4><Link to='/docs/controllers'>Version Handling</Link></h4>
          <h3><Link to='/docs/controllers'>Knobs</Link></h3>
          <h4><Link to='/docs/controllers'>Existing Knobs</Link></h4>
          <h4><Link to='/docs/controllers'>Create own Knob</Link></h4>
          <h3><Link to='/docs/controllers'>Plugins</Link></h3>
          <h4><Link to='/docs/controllers'>Add Plugins</Link></h4>
          <h4><Link to='/docs/controllers'>Create Own Plugin</Link></h4>
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
      border-radius: 8px;
      padding: 10px;
      padding-bottom: 50px;

      h3 {
        margin: 10px 0;
      }

      h4 {
        margin: 5px 0;
        margin-left: 10px;
      }

      h3, h4 {
        a { 
          text-decoration: none; 
          &:hover { color: #ba5eb6; cursor: pointer; }
        }
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