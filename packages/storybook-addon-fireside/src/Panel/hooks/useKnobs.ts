import * as React from 'react'
import * as t from '../../types'
import objPath = require('object-path')
import { PersistentChannel } from '../../persistentChannel'

type Output = {
  knobs: t.Knob[],
  props: Record<string,any>
  update: Function,
  key: string,
  tabs: string[],
  activeTab: string,
  setActiveTab: (tab:string) => void
}

export default function useKnobs(channel: PersistentChannel):Output {
  const [knobs,setKnobs] = React.useState<t.Knob[]>([])
  const [props,setProps] = React.useState<Record<string,any>>({})
  const allKnobs = React.useRef<t.Knob[]>([])
  const [key, setKey] = React.useState(1)
  const [tabs, setTabs] = React.useState([])
  const [activeTab, setActiveTab] = React.useState('DEFAULT')

  React.useEffect(() => {
    // Initial die gespeicherten Knobs abrufen
    const savedKnobs = channel.getKnobs();
    if (savedKnobs.length > 0) {
      processKnobs(savedKnobs);
    }

    channel.on("storyboard-bridge/set-knobs", async (knobs: t.Knob[]) => {
      processKnobs(knobs);
    });
  }, [channel])

  const processKnobs = async (knobs: t.Knob[]) => {
    const pendingFunctions: Promise<void>[] = [];
    
    for (const knob of knobs) {
      for (const key in knob.options) {
          //@ts-ignore
          const knobOption = knob.options[key];
          if (
            typeof knobOption === "string" &&
            knobOption.includes("function_")
          ) {
          const id = knob.options[key as keyof t.KnobOptions];
          const promise = new Promise<void>((resolve) => {
            channel.emit("storyboard-bridge/request-function", id);
            channel.on(
              `storyboard-bridge/response-function-${id}`,
              (fnString: string) => {
                const fn = new Function("return " + fnString)();
                knob.options[key as keyof t.KnobOptions] = fn;
                resolve();
              }
            );
          });
          pendingFunctions.push(promise);
        }
      }
    }
    await Promise.all(pendingFunctions);

    allKnobs.current = knobs
    const tabsSet = new Set<string>()
    for(let knob of knobs) tabsSet.add(knob.options.tab || 'DEFAULT')
    const newTabs = [...tabsSet]
    let newActiveTab = 'DEFAULT'
    if(!tabsSet.has('DEFAULT') && newTabs[0]) newActiveTab = newTabs[0]
    let filteredKnobs = calculateKnobs(knobs, newActiveTab)

    const newProps: Record<string,any> = {}
    for(const knob of knobs) objPath.set(newProps, knob.prop, knob.value)
    
    setProps(newProps)
    setKnobs(filteredKnobs)
    setTabs(newTabs)
    setActiveTab(newActiveTab)
    setKey(key => key + 1)
  }

  const overloadedSetActiveTab = (tab: string) => {
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