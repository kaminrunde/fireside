
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
  }
}