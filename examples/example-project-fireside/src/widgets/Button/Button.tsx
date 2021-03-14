import * as React from 'react'
import * as t from './types'

export default function Button (props:t.Props) {
  console.log('foo', props.context.byMediaSize['foo'])
  return <button>{props.label}---button</button>
}