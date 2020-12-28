import * as React from 'react'
import styled from 'styled-components'
import useKnobs from './hooks/useKnobs'
import Widget from './Widget'
import Tabs from './Tabs'
import * as t from '../types'

type Props = {
  channel: t.Channel,
  api: any
}

export default function Panel ({channel}:Props) {
  const {knobs,update,key, ...tabs} = useKnobs(channel)
  const [customComponents, setCustomComponents] = React.useState<Record<string, any>>({})

  React.useEffect(() => {
    channel.on('storyboard-bridge/register-custom-knob', (name, component) => {
      setCustomComponents(dict => ({...dict, [name]: component}))
    })
  }, [])

  return (
    <Wrapper>
      <Tabs key={key} tabs={tabs} />
      {knobs.map(knob => (
        <Widget 
          key={knob.id+key}
          knob={knob}
          customComponents={customComponents}
          onUpdate={val => update(knob, val)}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`

`