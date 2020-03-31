import * as React from 'react'
import * as t from '../../types'

type Output = {
  tabs: string[],
  activeTab: string,
  setActiveTab: (tab:string) => void,
  knobs: t.Knob[]
}

export default function useTabs (allKnobs:t.Knob[]):Output {
  const [tabs, setTabs] = React.useState(['DEFAULT'])
  const [activeTab, setActiveTab] = React.useState('DEFAULT')
  const [knobs, setKnobs] = React.useState([])
  
  React.useEffect(() => {
    const tabsSet = new Set<string>()
    for(let knob of allKnobs) tabsSet.add(knob.options.tab || 'DEFAULT')
    const tabs = [...tabsSet]
    const newActiveTab = !tabsSet.has('DEFAULT') ? tabs[0] || 'DEFAULT' : 'DEFAULT'
    const knobs = allKnobs.filter(knob => {
      if(!knob.options.tab && activeTab === 'DEFAULT') return true
      else return knob.options.tab === activeTab 
    })
    setTabs(tabs)
    setKnobs(knobs)
    setActiveTab(newActiveTab)
  }, [allKnobs, activeTab])

  return { tabs, knobs, activeTab, setActiveTab }
}