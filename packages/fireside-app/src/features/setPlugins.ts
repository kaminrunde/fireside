import config from 'config'
import {a, c} from 'modules/plugins'
import {addRule} from 'redux-ruleset'
import plugins from 'plugins'

addRule({
  id: 'feature/SET_PLUGINS',
  target: '*',
  output: c.SET_PLUGIN_EVENTS,
  addOnce: true,
  condition: () => Boolean(config.plugins.length),
  consequence: () => {
    let buffer = []

    for (let plugin of config.plugins) {
      let create = plugins[plugin.resolve]
      const feed = create(plugin.options)
      buffer.push(...feed)
    }

    return a.setPluginEvents(buffer)
  }
})

