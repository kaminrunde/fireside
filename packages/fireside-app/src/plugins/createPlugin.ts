import * as React from 'react'

export type PluginCtx<State> = {
  setState: (state:State) => void
}

export type Plugin<State> = (ctx:PluginCtx<State>) => {
  name: string,
  Badge: React.ElementType,
  extendComponent?: {
    defaultValue: State,
    key: string,
    hasBadge: (state:State) => boolean,
    icon?: {
      isActive: (state:State) => boolean,
      onClick: (state:State) => void
    },
    // settings?: {
    //   title: string,
    //   Component: React.ElementType
    // }
  }
}

export default function createPlugin<State>(plugin:Plugin<State>){ return plugin }