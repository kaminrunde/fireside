import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'

type Props = {
  value: string,
  onChange: (value:string) => void,
  focus: boolean,
  options: t.MarkdownOptions,
  hasError: boolean,
}

export default function Markdown (props:Props) {
  const ref = React.useRef<HTMLTextAreaElement|null>(null)

  return (
    <Wrapper focus={props.focus}>
      <textarea ref={ref} value={props.value} onChange={e => props.onChange(e.target.value)} rows={20}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
  border-radius: 3px;
  padding-left: 5px;
  > textarea {
    width: 100%;
    border: none;
    line-height: 30px;
    &:focus {
      outline: none;
    }
  }
`