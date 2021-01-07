import * as t from '../types'
import extendComponent, {ExtendComponent} from './extendComponent'
import extendsGridRow, {ExtendGridRow} from './extendGridRow'

type PluginContext<State,Options> = {
  extendComponent: (config:ExtendComponent<State>) => void,
  extendGridRow: (config:ExtendGridRow<State>) => void,
  options: Options
}

export default function createPlugin <State, Options extends t.PluginOptions>(
  cb:( context: PluginContext<State, Options>, options:Options)=> State
):(options:Options) => t.PluginEvent[] {
  return options => {
    let events:t.PluginEvent[] = []
  
    const context:PluginContext<State, Options> = {
      extendComponent: config => { events.push(...extendComponent(config, options)) },
      extendGridRow: config => { events.push(...extendsGridRow(config, options)) },
      options
    }
  
    const initialState = cb(context, options)
  
    events.push({type:'INITIAL_STATE', meta: options, payload: initialState})
  
    return events
  }
}
