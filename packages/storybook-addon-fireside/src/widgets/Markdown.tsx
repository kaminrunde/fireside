import * as React from 'react'
import styled from 'styled-components'
import * as t from '../types'
import Editor from "rich-markdown-editor"

type Props = {
  value: string,
  onChange: (value:string) => void,
  focus: boolean,
  options: t.MarkdownOptions,
}

export default function Markdown (props:Props) {
  return (
    <Wrapper focus={props.focus}>
      <Editor
        defaultValue={props.value}
        onChange={get => props.onChange(get())}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
  border-radius: 3px;
  padding: 5px;

`