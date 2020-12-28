import * as React from 'react'

export default function CustomKnobPlaceholder (props) {
  if(!props.options || !props.options.__name) return (
    <div>Some error happened</div>
  )
  return <div>Could not find custom knob with name "{props.options.__name}"</div>
}