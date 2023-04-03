import * as t from "../types";
export declare type ExtendComponentButtonList<State> = {
    onClickFn: (api: t.PluginComponentAPI<State>) => any;
    key: string;
    position: "row" | "bottom";
};
export default function extendComponentButtonList<State, Options extends t.PluginOptions>(config: ExtendComponentButtonList<State>, options: Options): t.PluginEvent[];
