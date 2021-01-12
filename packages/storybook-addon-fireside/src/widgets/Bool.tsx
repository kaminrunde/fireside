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
    <Wrapper>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onClick={() => props.onChange(!props.value)}
        checked={props.value}
      />
      <label
        style={{ background: props.value && 'rgb(29, 167, 253)' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: -15px;
  .react-switch-checkbox {
  height: 0;
  width: 0;
  visibility: hidden;
}

.react-switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 30px;
  background: grey;
  border-radius: 60px;
  position: relative;
  transition: background-color .2s;
}

.react-switch-label .react-switch-button {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
}

.react-switch-checkbox:checked + .react-switch-label .react-switch-button {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.react-switch-label:active .react-switch-button {
  width: 36px;
}
`