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
  const [handle, focus, ref] = useFocus()

  const update = val => {
    setValue(val)
    props.onUpdate(val)
  }

  if(props.knob.type === 'constant') return null

  const error = props.knob.options.validate
    ? props.knob.options.validate(value)
    : null

  return (
    <Wrapper ref={ref} onClick={handle}>
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


function useFocus ():[
  ()=>void, 
  boolean,
  React.MutableRefObject<HTMLElement | null>,
  ()=>void
] {
  const [activeEl, setActiveEl] = React.useState<null|HTMLElement>(null)
  const ref = React.useRef<null|HTMLElement>(null)
  const handle = () => {
    if(activeEl || !ref.current) return
    setActiveEl(ref.current)
  }

  React.useEffect(() => {
    if(!activeEl) return
    const elIsInDropdown = ({parentElement: el}:any) => {
      return el ? el === activeEl || elIsInDropdown(el) : false
    }
    const listener = e => {
      if(!elIsInDropdown(e.target)){
        window.removeEventListener('click', listener)
        setActiveEl(null)
      }
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [activeEl])

  return [handle, !!activeEl, ref, () => setActiveEl(null)]
}