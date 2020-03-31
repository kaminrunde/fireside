import * as React from 'react'
import * as t from '../../types'

type Output = [t.Knob[], Function, string]

export default function useKnobs(channel:t.Channel):Output {
  const [knobs,setKnobs] = React.useState<t.Knob[]>([])
  const [key, setKey] = React.useState(1)
  const update = (knob:t.Knob, value:any) => {
    channel.emit('storyboard-bridge/set-knob-value', {
      knobId: knob.id,
      payload: value
    })
  }

  React.useEffect(() => {
    channel.on('storyboard-bridge/set-knobs', knobs => {
      setKnobs(knobs)
      setKey(key => key+1)
    })
  },[channel])

  return [knobs, update, `${key}`]
}