import * as t from "../types";

export type CreateStaticComponent<State> = {
  isActive?: (api: t.PluginComponentAPI<State>) => boolean;
  component: (api: t.PluginComponentAPI<State>) => void;
};

export default function createStaticComponent<
  State,
  Options extends t.PluginOptions
>(config: CreateStaticComponent<State>, options: Options): t.PluginEvent[] {
  let events: t.PluginEvent[] = [];

  events.push({
    type: "CREATE_STATIC_COMPONENT",
    meta: { key: options.key },
    payload: config,
  });

  return events;
}
