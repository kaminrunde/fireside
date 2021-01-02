import * as t from '../types'

export type ExtendGridRow<State> = {
  badge?: {
    component: any
    isActive: (api:t.PluginGridRowAPI<State>) => boolean
  }
  icon?: {
    component: any
    isActive: (api:t.PluginGridRowAPI<State>) => boolean
    onClick: (api:t.PluginGridRowAPI<State>) => void
  }
  settingsModal?: {
    title: string
    component: any
  }
}

export default function extendGridRow <State>(
  config:ExtendGridRow<State>,
  options: t.PluginOptions 
):t.PluginEvent[] {
  let events:t.PluginEvent[] = []

  if(config.badge) events.push({
    type: 'GRID_ROW_BADGE',
    meta: options,
    payload: config.badge
  })

  if(config.icon) events.push({
    type: 'GRID_ROW_ICON',
    meta: options,
    payload: config.icon
  })

  if(config.settingsModal) events.push({
    type: 'GRID_ROW_SETTINGS',
    meta: options,
    payload: config.settingsModal
  })

  return events
}
