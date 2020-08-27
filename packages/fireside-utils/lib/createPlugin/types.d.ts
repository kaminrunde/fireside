import * as rootT from '../types';
export interface PluginAPI<State> {
    getState: () => State;
    setState: (state: State) => void;
}
export interface PluginComponentAPI<State> extends PluginAPI<State> {
    getComponent: () => rootT.Component;
    getCurrentMediaSize: () => string;
}
