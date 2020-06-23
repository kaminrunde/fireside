import * as React from 'react'
import * as t from './types'

export default function Banner (props:t.Props) {
  return <button>{props.label}---banner</button>
}