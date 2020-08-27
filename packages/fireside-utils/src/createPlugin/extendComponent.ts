import * as t from './types'
import * as et from './event-types'

export type ExtendComponentCb<State> = (api:t.PluginAPI<State>) => {
  badge?: {
    component: any
    isActive: (state:State) => boolean
  }
  icon?: {
    component: any
    isActive: (state:State) => boolean
    onClick: () => void
  }
  settingsModal?: {
    title: string
    component: (state:State, setState:(state:State)=>void) => any
  }
}

export default function extendComponent <State>(
  cb:ExtendComponentCb<State>, 
  api:t.PluginAPI<State>
):et.PluginEvent[] {
  let events:et.PluginEvent[] = []
  const result = cb(api)

  if(result.badge) events.push({
    type: 'COMPONENT_BADGE',
    payload: result.badge
  })

  if(result.icon) events.push({
    type: 'COMPONENT_ICON',
    payload: result.icon
  })

  if(result.settingsModal) events.push({
    type: 'COMPONENT_SETTINGS',
    payload: result.settingsModal
  })

  return []
}
