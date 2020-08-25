import * as React from 'react'
import * as t from '../types'
import getWidget from '../widgets'
import styled from 'styled-components'


type Props = {
  knob: t.Knob | t.SimpleKnob,
  onUpdate: (value:any) => void
}

export default function Widget (props:Props) {
  const [value, setValue] = React.useState(props.knob.value)
  const Component:any = getWidget(props.knob)
  const [focus, setFocus] = React.useState(false)

  const update = val => {
    setValue(val)
    props.onUpdate(val)
  }

  if(props.knob.type === 'constant') return null

  return (
    <Wrapper onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <h3 className='label'>{props.knob.label}</h3>
      {props.knob.options.hint && (
        <div className='hint'>{props.knob.options.hint}</div>
      )}
      <Component 
        value={value}
        onChange={update}
        focus={focus}
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
`