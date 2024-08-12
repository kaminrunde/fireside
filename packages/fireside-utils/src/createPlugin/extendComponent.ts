import * as t from "../types";

export type ExtendComponent<State> = {
  badge?: {
    component: any;
    isActive: (api: t.PluginComponentAPI<State>) => boolean;
  };
  icon?: {
    component: any;
    isActive: (api: t.PluginComponentAPI<State>) => boolean;
    onClick: (api: t.PluginComponentAPI<State>) => void;
  };
  settingsModal?: {
    title: string;
    component: (api: t.PluginComponentAPI<State>) => void;
  };
};

export default function extendComponent<State, Options extends t.PluginOptions>(
  config: ExtendComponent<State>,
  options: Options
): t.PluginEvent[] {
  let events: t.PluginEvent[] = [];

  if (config.badge)
    events.push({
      type: "COMPONENT_BADGE",
      meta: { key: options.key },
      payload: config.badge,
    });

  if (config.icon)
    events.push({
      type: "COMPONENT_ICON",
      meta: { key: options.key },
      payload: config.icon,
    });

  if (config.settingsModal)
    events.push({
      type: "COMPONENT_SETTINGS",
      meta: { key: options.key },
      payload: config.settingsModal,
    });

  return events;
}
