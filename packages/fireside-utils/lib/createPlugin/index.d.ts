import * as et from './event-types';
import { ExtendComponent } from './extendComponent';
declare type PluginContext<State> = {
    extendComponent: (config: ExtendComponent<State>) => void;
};
declare type PluginOptions = {};
export default function createPlugin<State>(cb: (context: PluginContext<State>, options: PluginOptions) => State): et.PluginEvent[];
export {};
