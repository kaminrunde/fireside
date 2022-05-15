import * as t from '../types';
export declare type ExtendComponent<State> = {
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
export default function extendComponent<State, Options extends t.PluginOptions>(config: ExtendComponent<State>, options: Options): t.PluginEvent[];
