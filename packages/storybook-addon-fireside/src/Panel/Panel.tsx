import * as React from 'react'
import styled from 'styled-components'
import useKnobs from './hooks/useKnobs'
import Widget from './Widget'
import Tabs from './Tabs'
import * as t from '../types'
import {CustomComponentsProvider} from './useCustomComponents'

type Props = {
  channel: t.Channel,
  api: any
}

export default function Panel ({channel}:Props) {
  const {knobs,props,update,key, ...tabs} = useKnobs(channel)
  const [customComponents, setCustomComponents] = React.useState<Record<string, any>>({})

  React.useEffect(() => {
    // @ts-ignore
    if(window.__customKnobs) setCustomComponents(window.__customKnobs)
    // @ts-ignore
    window.__addCustomKnob = (name, component) => 
      setCustomComponents(dict => ({...dict, [name]: component}))
  }, [])

  return (
    <CustomComponentsProvider value={customComponents}>
      <Wrapper>
        <Tabs key={key} tabs={tabs} />
        {knobs
        .filter(knob => {
          if(!knob.options.shouldDisplay) return true
          return knob.options.shouldDisplay(props)
        })
        .map(knob => (
          <Widget 
            key={knob.id+key}
            knob={knob}
            onUpdate={val => update(knob, val)}
          />
        ))}
      </Wrapper>
    </CustomComponentsProvider>
  )
}

const Wrapper = styled.div`
  padding-bottom: 300px;
`