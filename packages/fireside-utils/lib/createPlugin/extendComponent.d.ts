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
        component: any;
    };
};
export default function extendComponent<State>(config: ExtendComponent<State>, options: t.PluginOptions): t.PluginEvent[];
