import registerKnob from '@kaminrunde/storybook-addon-fireside/lib/registerKnob'
// import styled from 'styled-components'
// import * as React from 'react'

registerKnob('string', function String (props) {
  return (
    null
    // <Wrapper focus={props.focus}>
    //   <input 
    //     type='text'
    //     value={props.value} 
    //     onChange={e => props.onChange(e.target.value)}
    //   />
    // </Wrapper>
  )
})

// const Wrapper = styled.div`
//   border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
//   border-radius: 3px;
//   padding-left: 5px;
//   > input {
//     width: 100%;
//     border: none;
//     line-height: 30px;
//   }
// `