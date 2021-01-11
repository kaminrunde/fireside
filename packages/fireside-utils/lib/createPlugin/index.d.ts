import * as t from '../types';
import { ExtendComponent } from './extendComponent';
import { ExtendGridRow } from './extendGridRow';
import { ExtendSettingsPage } from './extendSettingsPage';
import { CreatePage } from './createPage';
declare type PluginContext<State, Options> = {
    extendComponent: (config: ExtendComponent<State>) => void;
    extendGridRow: (config: ExtendGridRow<State>) => void;
    extendSettingsPage: (config: ExtendSettingsPage<State>) => void;
    createPage: (config: CreatePage<State>) => void;
    options: Options;
};
export default function createPlugin<State, Options extends t.PluginOptions>(cb: (context: PluginContext<State, Options>, options: Options) => State): (options: Options) => t.PluginEvent[];
export {};
