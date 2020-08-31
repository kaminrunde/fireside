import * as t from '../types'
import extendComponent, {ExtendComponent} from './extendComponent'

type PluginContext<State> = {
  extendComponent: (config:ExtendComponent<State>) => void
}

export default function createPlugin <State>(
  cb:( context: PluginContext<State>, options:t.PluginOptions)=> State,
  options: t.PluginOptions
):t.PluginEvent[] {
  let events:t.PluginEvent[] = []

  const context:PluginContext<State> = {
    extendComponent: config => { events.push(...extendComponent(config, options)) }
  }

  const initialState = cb(context, options)

  events.push({type:'INITIAL_STATE', meta: options, payload: initialState})

  return events
}


// createPlugin<{foo:string}>(ctx => {
//   ctx.extendComponent(api => ({
//     icon: {
//       isActive: state => false,
//       component: 'hello',
//       onClick: () => null
//     }
//   }))
//   return {foo:'bar'}
// })