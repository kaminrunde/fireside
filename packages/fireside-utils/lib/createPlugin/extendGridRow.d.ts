import * as t from '../types';
export declare type ExtendGridRow<State> = {
    badge?: {
        component: any;
        isActive: (api: t.PluginGridRowAPI<State>) => boolean;
    };
    icon?: {
        component: any;
        isActive: (api: t.PluginGridRowAPI<State>) => boolean;
        onClick: (api: t.PluginGridRowAPI<State>) => void;
    };
    settingsModal?: {
        title: string;
        component: any;
    };
};
export default function extendGridRow<State, Options extends t.PluginOptions>(config: ExtendGridRow<State>, options: Options): t.PluginEvent[];
