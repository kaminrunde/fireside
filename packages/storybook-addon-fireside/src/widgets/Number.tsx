import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'

type Props = {
  value: number,
  onChange: (value:number) => void,
  focus: boolean,
  options: t.NumberOptions,
  hasError: boolean,
}

export default function String (props:Props) {
  return (
    <Wrapper focus={props.focus}>
      <input 
        type='number'
        value={props.value} 
        onChange={e => props.onChange(parseInt(e.target.value))}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<{focus: boolean}>`
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
  border-radius: 3px;
  padding-left: 5px;
  > input {
    width: 100%;
    border: none;
    line-height: 30px;
  }
`