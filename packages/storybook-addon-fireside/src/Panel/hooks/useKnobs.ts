import * as React from 'react'
import * as t from '../../types'
import objPath = require('object-path')


type Output = {
  knobs: t.Knob[],
  props: Record<string,any>
  update: Function,
  key: string,
  tabs: string[],
  activeTab: string,
  setActiveTab: (tab:string) => void
}

export default function useKnobs(channel:t.Channel):Output {
  const [knobs,setKnobs] = React.useState<t.Knob[]>([])
  const [props,setProps] = React.useState<Record<string,any>>({})
  const allKnobs = React.useRef<t.Knob[]>([])
  const [key, setKey] = React.useState(1)
  const [tabs, setTabs] = React.useState([])
  const [activeTab, setActiveTab] = React.useState('DEFAULT')

  React.useEffect(() => {
    channel.on('storyboard-bridge/set-knobs', (knobs:t.Knob[]) => {
      // setAllKnobs(knobs)
      allKnobs.current = knobs
      const tabsSet = new Set<string>()
      for(let knob of knobs) tabsSet.add(knob.options.tab || 'DEFAULT')
      const tabs = [...tabsSet]
      let activeTab = 'DEFAULT'
      if(!tabsSet.has('DEFAULT') && tabs[0]) activeTab = tabs[0]
      let filteredKnobs = calculateKnobs(knobs, activeTab)

      const props:Record<string,any> = {}
      for(const knob of knobs) objPath.set(props, knob.prop, knob.value)
      
      setProps(props)
      setKnobs(filteredKnobs)
      setTabs(tabs)
      setActiveTab(activeTab)
      setKey(key => key+1)
    })
  },[channel])

  const overloadedSetActiveTab = (tab:string) => {
    const filteredKnobs = calculateKnobs(allKnobs.current, tab)
    setKnobs(filteredKnobs)
    setActiveTab(tab)
  }



  return {
    knobs,
    props,
    update: (knob:t.Knob, value:any) => {
      knob.value = value
      channel.emit('storyboard-bridge/set-knob-value', {
        knobId: knob.id,
        payload: value
      })
      const props:Record<string,any> = {}
      for(const knob of allKnobs.current) objPath.set(props, knob.prop, knob.value)
      setProps(props)
    },
    key: key.toString(),
    tabs,
    activeTab,
    setActiveTab: overloadedSetActiveTab
  }
}

function calculateKnobs (knobs:t.Knob[], tab:string) {
  return knobs.filter(knob => {
    if(!knob.options.tab && tab === 'DEFAULT') return true
    else return knob.options.tab === tab 
  })
}