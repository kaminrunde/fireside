import * as t from "../types";
export type OnStoryUpdate<State> = (api: t.OnStoryUpdateAPI<State>) => void;
export default function onStoryUpdate<State, Options extends t.PluginOptions>(config: OnStoryUpdate<State>, options: Options): t.PluginEvent[];
