import * as t from '../types';
import { ExtendComponent } from './extendComponent';
import { ExtendGridRow } from './extendGridRow';
declare type PluginContext<State> = {
    extendComponent: (config: ExtendComponent<State>) => void;
    extendGridRow: (config: ExtendGridRow<State>) => void;
    options: t.PluginOptions;
};
export default function createPlugin<State>(cb: (context: PluginContext<State>, options: t.PluginOptions) => State): (options: t.PluginOptions) => t.PluginEvent[];
export {};
