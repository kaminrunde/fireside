import * as t from "../types";

export type ExtendSettingsPage<State> = {
  row?: {
    title: string;
    component: (api: t.SettingsPageAPI<State>) => any;
  };
};

export default function extendSettingsPage<
  State,
  Options extends t.PluginOptions
>(config: ExtendSettingsPage<State>, options: Options): t.PluginEvent[] {
  let events: t.PluginEvent[] = [];

  if (config.row)
    events.push({
      type: "SETTINGS_PAGE_ROW",
      meta: { key: options.key },
      payload: config.row,
    });

  return events;
}
