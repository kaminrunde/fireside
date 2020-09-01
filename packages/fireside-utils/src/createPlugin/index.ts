import * as t from '../types'
import extendComponent, {ExtendComponent} from './extendComponent'

type PluginContext<State> = {
  extendComponent: (config:ExtendComponent<State>) => void,
  options: t.PluginOptions
}

export default function createPlugin <State>(
  cb:( context: PluginContext<State>, options:t.PluginOptions)=> State
):(options:t.PluginOptions) => t.PluginEvent[] {
  return options => {
    let events:t.PluginEvent[] = []
  
    const context:PluginContext<State> = {
      extendComponent: config => { events.push(...extendComponent(config, options)) },
      options
    }
  
    const initialState = cb(context, options)
  
    events.push({type:'INITIAL_STATE', meta: options, payload: initialState})
  
    return events
  }
}
