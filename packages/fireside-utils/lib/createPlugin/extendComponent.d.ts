import * as t from './types';
import * as et from './event-types';
export declare type ExtendComponentCb<State> = (api: t.PluginAPI<State>) => {
    badge?: {
        component: any;
        isActive: (state: State) => boolean;
    };
    icon?: {
        component: any;
        isActive: (state: State) => boolean;
        onClick: () => void;
    };
    settingsModal?: {
        title: string;
        component: (state: State, setState: (state: State) => void) => any;
    };
};
export default function extendComponent<State>(cb: ExtendComponentCb<State>, api: t.PluginAPI<State>): et.PluginEvent[];
