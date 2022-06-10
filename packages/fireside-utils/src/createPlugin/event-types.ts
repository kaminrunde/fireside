
export type InitialStateEvent = {
  type: 'INITIAL_STATE'
  meta: {key:string}
  payload: any
}

export type ComponentBadgeEvent = {
  type: 'COMPONENT_BADGE'
  meta: {key:string}
  payload: {
    component: any
    isActive: (api:any) => boolean
  }
}

export type GridRowBadgeEvent = {
  type: 'GRID_ROW_BADGE'
  meta: {key:string}
  payload: {
    component: any
    isActive: (api:any) => boolean
  }
}

export type ComponentIconEvent = {
  type: 'COMPONENT_ICON'
  meta: {key:string}
  payload: {
    component: any
    isActive: (api:any) => boolean
    onClick: (api:any) => void
  }
}

export type GridRowIconEvent = {
  type: 'GRID_ROW_ICON'
  meta: {key:string}
  payload: {
    component: any
    isActive: (api:any) => boolean
    onClick: (api:any) => void
  }
}

export type ComponentSettingsEvent = {
  type: 'COMPONENT_SETTINGS'
  meta: {key:string}
  payload: {
    title: string
    component: any
  }
}

export type GridRowSettingsEvent = {
  type: 'GRID_ROW_SETTINGS'
  meta: {key:string}
  payload: {
    title: string
    component: any
    isActive?: (api:any) => boolean
  }
}

export type SettingsPageRowEvent = {
  type: 'SETTINGS_PAGE_ROW'
  meta: {key:string}
  payload: {
    title: string
    component: any
  }
}

export type CreatePageNavigationEvent = {
  type: 'CREATE_PAGE_NAVIGATION'
  meta: {key:string, slug: string}
  payload: {
    icon?: any
    label: any
  }
}

export type CreatePagePageEvent = {
  type: 'CREATE_PAGE_PAGE'
  meta: {key:string, slug: string}
  payload: {
    title: string
    component: any
  }
}

export type CreateStaticComponentEvent = {
  type: 'CREATE_STATIC_COMPONENT'
  meta: {key:string}
  payload: {
    isActive?: (api:any) => boolean
    component: any
  }
}