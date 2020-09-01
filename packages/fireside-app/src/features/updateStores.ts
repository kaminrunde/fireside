import {addRule} from 'redux-ruleset'
import * as $connector from 'modules/connector'
import * as $grid from 'modules/grid'
import * as $components from 'modules/components'
import * as $settings from 'modules/settings'
import * as $plugins from 'modules/plugins'

addRule<$connector.a.UpdateStory>({
  id: 'feature/UPDATE_STORES',
  target: $connector.c.UPDATE_STORY,
  output: [
    $grid.c.INIT, 
    $components.c.INIT, 
    $settings.c.INIT, 
    $plugins.c.INIT
  ],
  consequence: (action, {dispatch}) => {
    const {grids, componentsById, allComponents, plugins} = action.payload
    const updates = [
      $grid.a.init(grids),
      $components.a.init(componentsById, allComponents),
      $settings.a.init(Object.entries(grids).reduce<Record<string,boolean>>((p, n) => {
        const [key,val] = n
        p[key] = val.enabled || false
        return p
      },{})),
      $plugins.a.init(plugins || {})
    ]
    updates.forEach(update => dispatch(update))
  }
})