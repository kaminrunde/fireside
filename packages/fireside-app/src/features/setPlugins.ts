import config from "config";
import { a, c } from "modules/plugins";
import { addRule } from "redux-ruleset";
import plugins from "plugins";
import * as ui from "../modules/ui";
import { addComponentToComponentList, alert } from "./exportedPluginActions";

let clearAlertBoxCb: ((s: string) => void)[] = [];
addRule({
  id: "feature/OBSERVE_CLEAR_ALERT_BOX",
  target: ui.c.HIDE_MODAL,
  output: "#observe",
  addOnce: true,
  consequence: (action: ui.a.HideModal) => {
    for (const cb of clearAlertBoxCb) cb(action.payload);
  },
});

addRule({
  id: "feature/SET_PLUGINS",
  target: "*",
  output: c.SET_PLUGIN_EVENTS,
  addOnce: true,
  condition: () => Boolean(config.plugins.length),
  consequence: (_, { getState }) => {
    let buffer = [];
    const state = getState();

    const actions = {
      alert: (ctx) => alert(state, clearAlertBoxCb, ctx),
      addComponentToComponentList: addComponentToComponentList,
    };

    for (let plugin of config.plugins) {
      let create = plugins[plugin.resolve];
      const feed = create(plugin.options, actions);
      buffer.push(...feed);
    }

    return a.setPluginEvents(buffer);
  },
});
