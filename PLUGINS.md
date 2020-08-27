# Plugins

```javascript
export type PluginCtx<State> = {
  setState: (state:State) => void
}

export type Plugin<State> = (ctx:PluginCtx<State>) => {
  name: string,
  Badge: React.ElementType,
  extendComponent?: {
    defaultValue: State,
    key: string,
    Badge?: React.ElementType,
    hasBadge?: (state:State) => boolean,
    icon?: {
      isActive: (state:State) => boolean,
      onClick: (state:State) => void
    },
    settings?: {
      title: string,
      Component: React.ElementType
    }
  },
  extendRow?: {

  },
}

export default function createPlugin<State>(plugin:Plugin<State>){ return plugin }


export const create = createPlugin((ctx, options) => {
  ctx.setDefaultState({})

  ctx.extendComponent(api => ({
    // defaultValue: null,
    // key: 'fullWidth',
    Badge: () => null,
    hasBadge: (value, mediaSize) => Boolean(state) && state[mediaSize],
    icon: {
      isActive: (value, mediaSize) => Boolean(state) && state[mediaSize],
      onClick: (value, mediaSize, setValue) => {
        setValue(null)
      }
    }
  }))
})
```