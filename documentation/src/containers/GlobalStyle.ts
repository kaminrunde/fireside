import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    color: #555;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
  }

  h1 *, h2 *, h3 *, h4 *, h5 *, h6 * {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
  }

  h1, h1 * {
    font-size: 38px;
    letter-spacing: 0.95px;
  }

  h2,h2 * {
    font-size: 32px;
    letter-spacing: 0.85px;
  }

  h3,h3 * {
    font-size: 22px;
    letter-spacing: 0.75px;
  }

  h4,h4 * {
    font-size: 18px;
    letter-spacing: 0.65px;
  }
`