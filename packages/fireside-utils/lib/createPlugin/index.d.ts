import * as t from '../types';
import { ExtendComponent } from './extendComponent';
import { ExtendGridRow } from './extendGridRow';
import { ExtendSettingsPage } from './extendSettingsPage';
import { CreateStaticComponent } from './createStaticComponent';
import { CreatePage } from './createPage';
declare type PluginContext<State, Options> = {
    extendComponent: (config: ExtendComponent<State>) => void;
    extendGridRow: (config: ExtendGridRow<State>) => void;
    extendSettingsPage: (config: ExtendSettingsPage<State>) => void;
    createPage: (config: CreatePage<State>) => void;
    createStaticComponent: (config: CreateStaticComponent<State>) => void;
    options: Options;
    actions: t.PluginActions;
};
export default function createPlugin<State, Options extends t.PluginOptions>(cb: (context: PluginContext<State, Options>, options: Options) => State): (options: Options, actions: t.PluginActions) => t.PluginEvent[];
export {};
