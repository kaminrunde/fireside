import * as et from './event-types'
import extendComponent, {ExtendComponentCb} from './extendComponent'

type PluginContext<State> = {
  extendComponent: (cb:ExtendComponentCb<State>) => void
}

type PluginOptions = {}

export default function createPlugin <State>(cb:(
  context: PluginContext<State>,
  options: PluginOptions
)=> State):et.PluginEvent[] {
  let events:et.PluginEvent[] = []

  
  const context:PluginContext<State> = {
    extendComponent: cb => { events.push(...extendComponent(cb, {})) }
  }

  const initialState = cb(context, {})

  events.push({type:'INITIAL_STATE', payload: initialState})

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