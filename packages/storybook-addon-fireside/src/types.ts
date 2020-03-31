

export type StoryContext = {
  kind: string,
  story: string,
  id: string
}

export interface KnobOptions {
  hint?: string,
  tab?: string
}

export interface SimpleKnob {
  type: 'string' | 'constant',
  prop: string,
  label: string,
  value: any,
  options: KnobOptions
}

export interface Knob extends SimpleKnob {
  id: string,
  story: StoryContext
}

export type Controller = {
  versionUpdate?: Function,
  createContext?: Function,
  preprocessProps?: Function,
  createStoryEvents?: Function
}

export type Component = {
  id: string,
  name: string,
  props: object
}

type Event = 
| 'storyboard-bridge/set-knobs'
| 'storyboard-bridge/set-knob-value'
| 'storyboard-bridge/select-story'
| 'storyboard-bridge/story-selected'
| 'storyboard-bridge/hydrate-component'
| 'storyboard-bridge/update-component-name'
| 'storyboard-bridge/update-component-props'
export type Channel = {
  emit: (event:Event, options?:any) => void,
  on: (event:Event, cb:(val:any)=>void) => void,
  once: (event:Event, cb:(val:any)=>void) => void,
}