
type Ctx<State> = {
  setState: (state:State) => void
}

export default function createPlugin<State>(plugin:(ctx:Ctx<State>) => {
  name: string,
  Badge: any,
  componentContext?: {
    defaultValue: State,
    key: string,
    hasBadge: (state:State) => boolean,
    icon?: {
      isActive: (state:State) => boolean,
      onClick: (state:State) => void
    }
  }
}){ return plugin }