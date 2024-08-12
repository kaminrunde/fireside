import * as t from './types'
import objPath = require('object-path')
import {addons} from '@storybook/preview-api'
import { toId } from '@storybook/csf'
import { v4 as uuidv4 } from "uuid";

const knobStore:{[id:string]:t.Knob} = {}
const contextStore:{[id:string]:t.StoryContext} = {}
const selectorStore:{[id:string]: Function} = {}
let forceReRender:()=>void = () => null
let currentStoryId = ''
let currentKnobs: t.Knob[] = []
let currentController:t.Controller = {}
const channel:t.Channel = addons.getChannel()
let hydratedProps:null|object = null
const functionRegistry: any = {};

let componentToBeHydrated = ''


export function getKnobs (
  context: t.StoryContext,
  simpleKnobs: t.SimpleKnob[],
  controller: t.Controller,
  name: string,
  rerender:()=>void
) {
  contextStore[context.id] = context
  forceReRender = rerender
  const knobs = simpleKnobs.map(simpleKnob => {
    const id = `${context.kind}--${context.story}--${simpleKnob.prop}`
    if(knobStore[id]) return knobStore[id]
    else return knobStore[id] = {
      ...simpleKnob,
      id: id,
      story: context,
      defaultValue: simpleKnob.value
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

  if (currentStoryId !== context.id || hydratedProps) {
    componentToBeHydrated = ''
    currentStoryId = context.id;
    currentKnobs = knobs
    currentController = controller
    hydratedProps = null
    channel.emit('storyboard-bridge/update-component-name', name)
    channel.emit(
      "storyboard-bridge/set-knobs",
      replaceFunctionsWithIdsAndEmit(knobs)
    );
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

function clearKnobs () {
  for(const id in knobStore) knobStore[id].value = knobStore[id].defaultValue
  forceReRender()
  channel.emit('storyboard-bridge/set-knobs', replaceFunctionsWithIdsAndEmit(currentKnobs))
}

channel.on('storyboard-bridge/clear-props', () => {
  clearKnobs()
})

channel.on('storyboard-bridge/set-knob-value', ({knobId,payload}) => {
  const knob = knobStore[knobId]
  if(!knob) throw new Error('#1 something strange happen')
  knob.value = payload
  channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs))
  forceReRender()
})

channel.on('storyboard-bridge/hydrate-component', async (component:t.Component) => {
  const selector = selectorStore[component.name]
  if(!selector){
    throw new Error('you forgot to implement "registerWidgetSelector" for widget '+component.name)
  }
  clearKnobs()
  let context:t.StoryContext = selector(component.props)
  // transform of the story name to match the storybook id
  // storybook is doing this, when the story is registered
  // based on the exported storyname
  context.id = toId(context.kind, startCase(context.story));
  context.story = transformIfPascalCase(context.story)

  const hydrate = () => {
    const props = currentController.versionUpdate 
    ? currentController.versionUpdate(component.props) 
    : component.props
    currentKnobs.forEach(knob => {
      const hydratedValue = objPath.get(props, knob.prop)
      knob.value = hydratedValue ?? knob.value
    })
    channel.emit('storyboard-bridge/set-knobs', replaceFunctionsWithIdsAndEmit(currentKnobs))
    channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs))
    forceReRender()
  }

  if(currentStoryId !== context.id) {
    hydratedProps = component.props 
    channel.emit('storyboard-bridge/select-story', context)
    while (componentToBeHydrated !== context.id) {
      await new Promise((resolve) => setTimeout(() => {
        resolve(true)
      }, 16))
    }
    hydrate()
  }
  else hydrate()
  
  
  
})

channel.emit('storyboard-bridge/init-knob-manager')

channel.on("storyboard-bridge/story-component-loaded", (loadedComponent) => {
  componentToBeHydrated = loadedComponent;
});

channel.on("storyboard-bridge/register-function", ({ id, fn }) => {
  functionRegistry[id] = fn;
});

channel.on("storyboard-bridge/request-function", (id) => {
  if (functionRegistry[id]) {
    channel.emit(
      `storyboard-bridge/response-function-${id}`,
      functionRegistry[id]
    );
  }
});

const startCase = (str: string) => {
return str
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/(\s|_)+/g, ' ')
  .replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
};

const isPascalCase = (str: string)  => {
  const isPascalCase = /^([A-Z][a-z0-9]*)+$/;
  return isPascalCase.test(str);
}

const pascalToSnakeCase = (str: string) => 
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);


// storybook-transformation
const transformIfPascalCase = (str: string) => {
  if (isPascalCase(str)) {
      return pascalToSnakeCase(str);
  } else {
      return str;
  }
}

const generateUniqueId = () => {
  return `function_${uuidv4()}`;
}

const replaceFunctionsWithIdsAndEmit = (knobs: any) => {
  const knobsWithIds = knobs;
  for (const knob of knobsWithIds) {
    for (const key in knob.options) {
      if (typeof knob.options[key] === "function") {
        const id = generateUniqueId();
        functionRegistry[id] = knob.options[key].toString();
        channel.emit("storyboard-bridge/register-function", {
          id,
          fn: knob.options[key].toString(),
        });
        knob.options[key] = id;
      }
    }
  }
  return knobsWithIds;
}