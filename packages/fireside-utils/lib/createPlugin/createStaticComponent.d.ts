import * as t from '../types';
export declare type CreateStaticComponent<State> = {
    isActive?: (api: t.PluginComponentAPI<State>) => boolean;
    component: (api: t.PluginComponentAPI<State>) => void;
};
export default function createStaticComponent<State, Options extends t.PluginOptions>(config: CreateStaticComponent<State>, options: Options): t.PluginEvent[];
