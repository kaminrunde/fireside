import config from 'config'
import store from 'store'

if(config.plugins.length) {
  let buffer = []

  for (let plugin of config.plugins) {
    const create = require(plugin.resolve)
    const feed = create(plugin.options)
    buffer.push(...feed)
  }

  if(buffer.length) {
    store.dispatch({
      type: 'SET_PLUGINS',
      payload: buffer
    })
  }
}