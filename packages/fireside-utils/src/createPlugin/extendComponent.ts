import * as t from '../types'

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
  options: t.PluginOptions 
):t.PluginEvent[] {
  let events:t.PluginEvent[] = []

  if(config.badge) events.push({
    type: 'COMPONENT_BADGE',
    meta: options,
    payload: config.badge
  })

  if(config.icon) events.push({
    type: 'COMPONENT_ICON',
    meta: options,
    payload: config.icon
  })

  if(config.settingsModal) events.push({
    type: 'COMPONENT_SETTINGS',
    meta: options,
    payload: config.settingsModal
  })

  return events
}
