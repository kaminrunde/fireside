import * as t from '../types';
import { ExtendComponent } from './extendComponent';
import { ExtendGridRow } from './extendGridRow';
declare type PluginContext<State, Options> = {
    extendComponent: (config: ExtendComponent<State>) => void;
    extendGridRow: (config: ExtendGridRow<State>) => void;
    options: Options;
};
export default function createPlugin<State, Options extends t.PluginOptions>(cb: (context: PluginContext<State, Options>, options: Options) => State): (options: Options) => t.PluginEvent[];
export {};
