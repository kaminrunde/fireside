import config from 'config'
import {a, c} from 'modules/plugins'
import p1 from 'plugins/full-width-components'
import {addRule} from 'redux-ruleset'

addRule({
  id: 'feature/SET_PLUGINS',
  target: '*',
  output: c.SET_PLUGIN_EVENTS,
  addOnce: true,
  condition: () => Boolean(config.plugins.length),
  consequence: () => {
    let buffer = []

    for (let plugin of config.plugins) {
      let create = p1
      if(plugin.resolve !== '@kaminrunde/fireside-plugin-fullwidth-components'){
        create = require(plugin.resolve)
      }
      const feed = create(plugin.options)
      buffer.push(...feed)
    }

    return a.setPluginEvents(buffer)
  }
})