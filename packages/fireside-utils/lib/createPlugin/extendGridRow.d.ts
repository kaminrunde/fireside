import * as t from '../types';
export declare type ExtendGridRow<State> = {
    badge?: {
        component: (props: t.PluginGridRowAPI<State>) => any;
        isActive: (api: t.PluginGridRowAPI<State>) => boolean;
    };
    icon?: {
        component: (props: t.PluginGridRowAPI<State>) => any;
        isActive: (api: t.PluginGridRowAPI<State>) => boolean;
        onClick: (api: t.PluginGridRowAPI<State>) => void;
    };
    settingsModal?: {
        title: string;
        isActive?: (api: t.PluginGridRowAPI<State>) => boolean;
        component: (props: t.PluginGridRowAPI<State>) => any;
    };
};
export default function extendGridRow<State, Options extends t.PluginOptions>(config: ExtendGridRow<State>, options: Options): t.PluginEvent[];
