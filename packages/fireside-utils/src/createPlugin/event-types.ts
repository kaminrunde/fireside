
export type InitialStateEvent = {
  type: 'INITIAL_STATE',
  payload: any
}

export type ComponentBadgeEvent = {
  type: 'COMPONENT_BADGE'
  payload: {
    component: any
    isActive: (api:any) => boolean
  }
}

export type ComponentIconEvent = {
  type: 'COMPONENT_ICON'
  payload: {
    component: any
    isActive: (api:any) => boolean
    onClick: (api:any) => void
  }
}

export type ComponentSettingsEvent = {
  type: 'COMPONENT_SETTINGS',
  payload: {
    title: string
    component: any
  }
}

export type PluginEvent = 
| InitialStateEvent
| ComponentBadgeEvent 
| ComponentIconEvent
| ComponentSettingsEvent