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

export default function extendGridRow <State, Options extends t.PluginOptions>(
  config:ExtendGridRow<State>,
  options: Options
):t.PluginEvent[] {
  let events:t.PluginEvent[] = []

  if(config.badge) events.push({
    type: 'GRID_ROW_BADGE',
    meta: {key:options.key},
    payload: config.badge
  })

  if(config.icon) events.push({
    type: 'GRID_ROW_ICON',
    meta: {key:options.key},
    payload: config.icon
  })

  if(config.settingsModal) events.push({
    type: 'GRID_ROW_SETTINGS',
    meta: {key:options.key},
    payload: config.settingsModal
  })

  return events
}
