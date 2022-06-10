import config from 'config'
import {a, c} from 'modules/plugins'
import {addRule} from 'redux-ruleset'
import plugins from 'plugins'
import * as ui from '../modules/ui'
import {ModalConfig} from '../modules/ui/types'
import store from 'store'

let clearAlertBoxCb = (result:string) => null
addRule({
  id: 'feature/OBSERVE_CLEAR_ALERT_BOX',
  target: ui.c.HIDE_MODAL,
  output: '#observe',
  addOnce: true,
  consequence: (action:ui.a.HideModal) => {
    clearAlertBoxCb(action.payload)
  }
})

addRule({
  id: 'feature/SET_PLUGINS',
  target: '*',
  output: c.SET_PLUGIN_EVENTS,
  addOnce: true,
  condition: () => Boolean(config.plugins.length),
  consequence: (_, {getState}) => {
    let buffer = []

    const actions = {
      alert: (ctx:ModalConfig) => {
        const state = getState()
        if(state.ui.modal) return
        store.dispatch(ui.a.showModal(ctx))
        return new Promise(resolve => {
          clearAlertBoxCb = resolve
        })
      }
    }

    for (let plugin of config.plugins) {
      let create = plugins[plugin.resolve]
      const feed = create(plugin.options, actions)
      buffer.push(...feed)
    }

    return a.setPluginEvents(buffer)
  }
})

