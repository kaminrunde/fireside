import * as React from 'react'
import * as t from '../types'
import getWidget from '../widgets'
import styled from 'styled-components'


type Props = {
  knob: t.Knob | t.SimpleKnob,
  customComponents: Record<string, any>,
  onUpdate: (value:any) => void
}

export default function Widget (props:Props) {
  const [value, setValue] = React.useState(props.knob.value)
  const Component:any = getWidget(props.knob, props.customComponents)
  const [focus, setFocus] = React.useState(false)

  const update = val => {
    setValue(val)
    props.onUpdate(val)
  }

  if(props.knob.type === 'constant') return null

  const error = props.knob.options.validate
    ? props.knob.options.validate(value)
    : null

  return (
    <Wrapper onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <h3 className='label'>{props.knob.label}</h3>
      {props.knob.options.hint && (
        <div className='hint'>{props.knob.options.hint}</div>
      )}
      {error && (
        <div className='error'>
          {error}
        </div>
      )}
      <Component 
        value={value}
        onChange={update}
        focus={focus}
        hasError={!!error}
        options={props.knob.options}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 10px;
  &:active {outline:none;}
  > .label {
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 30px;
  }
  > .hint {
    color: grey;
    line-height: 18px;
  }
  > .error {
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
    color: #ff5722;
    margin-top: -5px;
    margin-bottom: 5px;
  }
`