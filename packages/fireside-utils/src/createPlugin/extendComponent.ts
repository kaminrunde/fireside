import * as rootT from '../types'
import * as t from './types'
import * as et from './event-types'

export type ExtendComponent<State> = {
  badge?: {
    component: any
    isActive: (api:t.PluginComponentAPI<State>) => boolean
  }
  icon?: {
    component: any
    isActive: (api:t.PluginComponentAPI<State>) => boolean
    onClick: (api:t.PluginComponentAPI<State>) => void
  }
  settingsModal?: {
    title: string
    component: any
  }
}

export default function extendComponent <State>(
  config:ExtendComponent<State>, 
):et.PluginEvent[] {
  let events:et.PluginEvent[] = []

  if(config.badge) events.push({
    type: 'COMPONENT_BADGE',
    payload: config.badge
  })

  if(config.icon) events.push({
    type: 'COMPONENT_ICON',
    payload: config.icon
  })

  if(config.settingsModal) events.push({
    type: 'COMPONENT_SETTINGS',
    payload: config.settingsModal
  })

  return []
}
