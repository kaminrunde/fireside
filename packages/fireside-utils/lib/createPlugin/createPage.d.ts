import * as t from '../types';
export declare type CreatePage<State> = {
    slug: string;
    navigation?: {
        icon?: any;
        label: string;
    };
    page: {
        title: string;
        component: any;
    };
};
export default function createPage<State, Options extends t.PluginOptions>(config: CreatePage<State>, options: Options): t.PluginEvent[];
