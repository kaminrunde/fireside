import * as React from 'react'
import styled from 'styled-components'
import useKnobs from './hooks/useKnobs'
import Widget from './Widget'
import Tabs from './Tabs'
import * as t from '../types'
import useTabs from './hooks/useTabs'

type Props = {
  channel: t.Channel,
  api: any
}

export default function Panel ({channel}:Props) {
  const [knobs,update,key] = useKnobs(channel)
  const tabs = useTabs(knobs)
  return (
    <Wrapper>
      <Tabs key={key} tabs={tabs} />
      {tabs.knobs.map(knob => (
        <Widget 
          key={knob.id+key}
          knob={knob}
          onUpdate={val => update(knob, val)}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`

`