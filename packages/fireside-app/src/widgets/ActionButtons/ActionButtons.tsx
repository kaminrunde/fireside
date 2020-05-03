import * as React from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import * as t from './types'

let allIds:Record<string,t.ActionButton[]> = {}
let byId:string[] = []
let listener:null|((data:t.ActionButton[])=>void) = null
const update = () => {
  if(!listener) return
  listener(allIds[byId[byId.length-1]] || [])
}
const add = (id:string, data:t.ActionButton[]) => {
  byId.push(id)
  allIds[id] = data
  update()
}
const remove = (id:string) => {
  const index = byId.findIndex(idx => idx === id)
  if(index === -1) return
  byId.splice(index,1)
  delete allIds[id]
  update()
}

export default function ActionButtons (props:{buttons:t.ActionButton[]}) {
  React.useEffect(() => {
    const id = v4()
    add(id, props.buttons)
    return () => remove(id)
  },[props.buttons])
  return null
}

export function ActionButtonsDisplay () {
  const [buttons,setButtons] = React.useState<t.ActionButton[]>([])
  React.useLayoutEffect(() => { listener = setButtons },[])

  return (
    <Wrapper className='ActionButtonsDisplay'>
      {buttons.map(({label,...rest}) => (
        <Btn key={label} {...rest} children={label}/>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  > button { margin: 0 10px; }
`

const Btn = styled.button`
  padding: 10px;
  min-width: 100px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  ${(props:any) => props.type === 'primary' && `
    background: #009688;
    color: white;
  `}

  ${(props:any) => props.type === 'danger' && `
    background: #e91e63;
    color: white;
  `}

  ${(props:any) => props.type === 'secondary' && `
    background: #00bcd4;
    color: white;
  `}
`