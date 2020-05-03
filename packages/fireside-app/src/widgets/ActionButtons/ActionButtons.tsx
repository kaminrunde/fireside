import * as React from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'

type Button = {
  label: string,
  type: 'primary' | 'secondary' | 'danger',
  /** what should happen when we click on the button */
  onClick: () => void
}

let allIds:Record<string,Button[]> = {}
let byId:string[] = []
let listener:null|((data:Button[])=>void) = null
const update = () => {
  if(!listener) return
  listener(allIds[byId[byId.length-1]])
}
const add = (id:string, data:Button[]) => {
  byId.push(id)
  allIds[id] = data
  update()
}
const remove = (id:string) => {
  const index = byId.findIndex(idx => idx === id)
  if(!index) return
  byId.splice(index,1)
  delete allIds[id]
  update()
}

export default function ActionButtons (props:{buttons:Button[]}) {
  React.useEffect(() => {
    const id = v4()
    add(id, props.buttons)
    return () => remove(id)
  },[props.buttons])
  return null
}

export function ActionButtonsDisplay () {
  const [buttons,setButtons] = React.useState<Button[]>([])
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