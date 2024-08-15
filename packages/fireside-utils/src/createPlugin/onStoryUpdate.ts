import * as t from "../types";

export type OnStoryUpdate<State> = (api: t.OnStoryUpdateAPI<State>) => void;

export default function onStoryUpdate<State, Options extends t.PluginOptions>(
  config: OnStoryUpdate<State>,
  options: Options
): t.PluginEvent[] {
  let events: t.PluginEvent[] = [];

  events.push({
    type: "ON_STORY_UPDATE",
    meta: { key: options.key },
    payload: config,
  });

  return events;
}
