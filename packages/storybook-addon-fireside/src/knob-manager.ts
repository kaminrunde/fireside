import * as t from './types'
import objPath = require('object-path')
import addons from '@storybook/addons'
import { forceReRender } from '@storybook/react'

const knobStore:{[id:string]:t.Knob} = {}
const contextStore:{[id:string]:t.StoryContext} = {}
const selectorStore:{[id:string]: Function} = {}
let currentStoryId = ''
let currentKnobs = []
let currentController:t.Controller = {}
const channel:t.Channel = addons.getChannel()
let hydratedProps:null|object = null

export function getKnobs (
  context: t.StoryContext,
  simpleKnobs: t.SimpleKnob[],
  controller: t.Controller,
  name: string
) {
  contextStore[context.id] = context
  const knobs = simpleKnobs.map(simpleKnob => {
    const id = `${context.kind}--${context.story}--${simpleKnob.prop}`
    if(knobStore[id]) return knobStore[id]
    else return knobStore[id] = {
      ...simpleKnob,
      id: id,
      story: context
    }
  })
  if(hydratedProps) {
    const props = controller.versionUpdate 
      ? controller.versionUpdate(hydratedProps) 
      : hydratedProps
    knobs.forEach(knob => {
      const hydratedValue = objPath.get(props, knob.prop)
      knob.value = hydratedValue || knob.value
    })
  }
  else if(controller.versionUpdate){
    const props = controller.versionUpdate(getProps(knobs))
    knobs.forEach(knob => {
      const newValue = objPath.get(props, knob.prop)
      knob.value = newValue || knob.value
    })
  }

  if(currentStoryId !== context.id || hydratedProps){
    currentStoryId = context.id
    currentKnobs = knobs
    currentController = controller
    hydratedProps = null
    channel.emit('storyboard-bridge/update-component-name', name)
    channel.emit('storyboard-bridge/set-knobs', knobs)
    channel.emit('storyboard-bridge/update-component-props', getProps(knobs))
  }

  return knobs
}

export function getProps (knobs: t.Knob[]):object {
  let props:object = {}
  for(let knob of knobs) {
    objPath.set(props, knob.prop, knob.value)
  }
  return props
}

export function addSelector (name:string, cb:Function) {
  selectorStore[name] = cb
}

channel.on('storyboard-bridge/set-knob-value', ({knobId,payload}) => {
  const knob = knobStore[knobId]
  if(!knob) throw new Error('#1 something strange happen')
  knob.value = payload
  channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs))
  forceReRender()
})

channel.on('storyboard-bridge/hydrate-component', (component:t.Component) => {
  const selector = selectorStore[component.name]
  console.log(component.name, selectorStore)
  if(!selector){
    throw new Error('you forgot to implement "registerWidgetSelector" for widget '+component.name)
  }
  let context:t.StoryContext = selector(component.props)
  context.id = `${context.kind.replace(/\//g, '-').toLowerCase()}--${context.story}`.toLowerCase()
  const props = currentController.versionUpdate 
    ? currentController.versionUpdate(component.props) 
    : component.props
  currentKnobs.forEach(knob => {
    const hydratedValue = objPath.get(props, knob.prop)
    knob.value = hydratedValue || knob.value
  })
  channel.emit('storyboard-bridge/set-knobs', currentKnobs)
  channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs))
  forceReRender()
  
  if(currentStoryId !== context.id) {
    hydratedProps = component.props 
    channel.emit('storyboard-bridge/select-story', context)
  }
})

channel.emit('storyboard-bridge/init-knob-manager')