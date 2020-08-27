import * as et from './event-types';
import { ExtendComponentCb } from './extendComponent';
declare type PluginContext<State> = {
    extendComponent: (cb: ExtendComponentCb<State>) => void;
};
declare type PluginOptions = {};
export default function createPlugin<State>(cb: (context: PluginContext<State>, options: PluginOptions) => State): et.PluginEvent[];
export {};
