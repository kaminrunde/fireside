import * as React from 'react'
import {PluginGridRowAPI} from '@kaminrunde/fireside-utils'

type State = {
  [row:number]: string
}

export default function Modal (props:PluginGridRowAPI<State>) {
  return (
    <span>Hello World</span>
  )
}