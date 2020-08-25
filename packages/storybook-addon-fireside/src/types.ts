

export type StoryContext = {
  kind: string,
  story: string,
  id: string
}

export interface KnobOptions {
  /** hint text is displayed below the label */
  hint?: string,
  /** renders knob in seperate tab. Knobs with the same tab are grouped together. if not defined tab will default to "DEFAULT" */
  tab?: string
}

export interface StringOptions extends KnobOptions {}
export interface StringListOptions extends KnobOptions {}
export interface NumberOptions extends KnobOptions {}
export interface BoolOptions extends KnobOptions {}
export interface ObjectListOptions extends KnobOptions {
  /** define the schema of each row. this works the same way you define the schema of your components */
  schema: SimpleKnob[],
  /** this is the name of the row, that will be displayed in the sortable list */
  getRowName: (row:any) => string
}

export interface MarkdownOptions extends KnobOptions {
  /** see https://www.npmjs.com/package/simplemde for more info */
  autofocus?: true,
  /** see https://www.npmjs.com/package/simplemde for more info */
  blockStyles?: {
      bold?: string,
      italic?: string
  },
  /** see https://www.npmjs.com/package/simplemde for more info */
  forceSync?: boolean,
  // hideIcons?: ["guide", "heading"],
  /** see https://www.npmjs.com/package/simplemde for more info */
  indentWithTabs?: boolean,
  /** see https://www.npmjs.com/package/simplemde for more info */
  insertTexts?: any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  lineWrapping?: boolean,
  /** see https://www.npmjs.com/package/simplemde for more info */
  parsingConfig?: any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  placeholder?: string,
  /** see https://www.npmjs.com/package/simplemde for more info */
  promptURLs?: boolean,
  /** see https://www.npmjs.com/package/simplemde for more info */
  renderingConfig?: any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  shortcuts?: any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  showIcons?: string[],
  /** see https://www.npmjs.com/package/simplemde for more info */
  spellChecker?: boolean,
  /** see https://www.npmjs.com/package/simplemde for more info */
  hideIcons?: string[],
  /** see https://www.npmjs.com/package/simplemde for more info */
  status?: boolean | string[] | any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  styleSelectedText?: boolean,
  /** see https://www.npmjs.com/package/simplemde for more info */
  tabSize?: number,
  /** see https://www.npmjs.com/package/simplemde for more info */
  toolbar?: any,
  /** see https://www.npmjs.com/package/simplemde for more info */
  toolbarTips?: any
}

export interface SimpleKnob {
  type: 'string' | 'constant' | 'number' | 'markdown' | 'bool' | 'stringList' | 'objectList',
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
| 'storyboard-bridge/init-knob-manager'
export type Channel = {
  emit: (event:Event, options?:any) => void,
  on: (event:Event, cb:(val:any)=>void) => void,
  once: (event:Event, cb:(val:any)=>void) => void,
}