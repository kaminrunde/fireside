import * as t from '../types';
export declare type ExtendSettingsPage<State> = {
    row?: {
        title: string;
        component: (api: t.SettingsPageAPI<State>) => any;
    };
};
export default function extendSettingsPage<State, Options extends t.PluginOptions>(config: ExtendSettingsPage<State>, options: Options): t.PluginEvent[];
