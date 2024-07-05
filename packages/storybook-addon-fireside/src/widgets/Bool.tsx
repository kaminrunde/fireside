import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'

type Props = {
  value: boolean,
  onChange: (value:boolean) => void,
  focus: boolean,
  hasError: boolean,
  options: t.BoolOptions,
}

export default function Bool (props:Props) {
  return (
    <Wrapper on={props.value.toString()} onClick={() =>props.onChange(!props.value)}>
      {props.value ? 'ON' : 'OFF'}
    </Wrapper>
  )
}

const Wrapper = styled.button<{on: string}>`
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  background: ${props => props.on === 'true' ? '#8bc34a' : '#e91e63'};
`