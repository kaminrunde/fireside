import * as t from '../types'
import extendComponent, {ExtendComponent} from './extendComponent'
import extendGridRow, {ExtendGridRow} from './extendGridRow'
import extendSettingsPage, {ExtendSettingsPage} from './extendSettingsPage'
import createPage, {CreatePage} from './createPage'

type PluginContext<State,Options> = {
  extendComponent: (config:ExtendComponent<State>) => void
  extendGridRow: (config:ExtendGridRow<State>) => void
  extendSettingsPage: (config:ExtendSettingsPage<State>) => void
  createPage: (config:CreatePage<State>) => void
  options: Options
}

export default function createPlugin <State, Options extends t.PluginOptions>(
  cb:( context: PluginContext<State, Options>, options:Options)=> State
):(options:Options) => t.PluginEvent[] {
  return options => {
    let events:t.PluginEvent[] = []
  
    const context:PluginContext<State, Options> = {
      extendComponent: config => { events.push(...extendComponent(config, options)) },
      extendGridRow: config => { events.push(...extendGridRow(config, options)) },
      extendSettingsPage: config => { events.push(...extendSettingsPage(config, options)) },
      createPage: config => { events.push(...createPage(config, options)) },
      options
    }
  
    const initialState = cb(context, options)
  
    events.push({type:'INITIAL_STATE', meta: options, payload: initialState})
  
    return events
  }
}
