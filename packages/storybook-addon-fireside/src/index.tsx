import * as React from 'react'
import * as t from './types'
import * as manager from './knob-manager'
import WidgetWrapper from './WidgetWrapper'

export const string = (
  prop:string, 
  label:string, 
  value:string, 
  options:t.StringOptions={}
):t.SimpleKnob => ({ type: 'string', prop, label, value, options })

export const constant = (
  prop:string, 
  label:string, 
  value:any, 
  options:t.KnobOptions={}
):t.SimpleKnob => ({ type: 'constant', prop, label, value, options })

export const number = (
  prop:string, 
  label:string, 
  value:number, 
  options:t.NumberOptions={}
):t.SimpleKnob => ({ type: 'number', prop, label, value, options })

export const markdown = (
  prop:string, 
  label:string, 
  value:string, 
  options:t.MarkdownOptions={}
):t.SimpleKnob => ({ type: 'markdown', prop, label, value, options })

export const bool = (
  prop:string, 
  label:string, 
  value:boolean, 
  options:t.BoolOptions={}
):t.SimpleKnob => ({ type: 'bool', prop, label, value, options })


export const create = (
  name: string,
  component: React.ElementType, 
  simpleKnobs: t.SimpleKnob[],
  controller:t.Controller={}
):any => (context:t.StoryContext) => {
  const knobs = manager.getKnobs(context, simpleKnobs, controller, name)
  let props = manager.getProps(knobs)
  return <WidgetWrapper {...{component, props, controller}}/>
}

export const registerWidgetSelector = (
  name: string,
  cb: (props:object) => { kind:string, story:string }
) => {
  manager.addSelector(name, cb)
}
