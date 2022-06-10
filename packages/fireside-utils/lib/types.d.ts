import * as et from './createPlugin/event-types';
export declare type Connector = {
    name: string;
    onChange: (cb: (story?: RawStory) => void) => void;
    setStory: (story: RawStory) => void;
};
export declare type PluginOptions = {
    key: string;
};
export declare type PluginActions = {
    alert: (ctx: {
        title: string;
        description?: string;
        options?: string[];
    }) => Promise<string | null>;
};
export interface PluginAPI<State> {
    state: State;
    setState: (state: State) => void;
    story: RawStory;
}
export interface PluginComponentAPI<State> extends PluginAPI<State> {
    component: Component;
    mediaSize: string;
}
export interface PluginGridRowAPI<State> extends PluginAPI<State> {
    mediaSize: string;
    row: number;
}
export interface SettingsPageAPI<State> extends PluginAPI<State> {
}
export interface StaticComponentAPI<State> extends PluginAPI<State> {
}
export declare type PluginEvent = et.InitialStateEvent | et.ComponentBadgeEvent | et.ComponentIconEvent | et.ComponentSettingsEvent | et.GridRowBadgeEvent | et.GridRowIconEvent | et.GridRowSettingsEvent | et.SettingsPageRowEvent | et.CreatePageNavigationEvent | et.CreatePagePageEvent | et.CreateStaticComponentEvent;
export declare type Config = {
    resolveController?: (name: string) => Controller<any, any> | Promise<Controller<any, any>>;
    nodes?: string[] | {
        name: string;
        key: string;
    }[];
};
export declare type Controller<ComponentConfig, Context> = {
    /**
     * This is the first hook that is ever called in the controller lifecicle. A some
     * point you want to change the component config. but there may be a bunch of static
     * configurations in your cms, you cannot change. So this hook is able to transform
     * the older content into your newer one. When you have a newer version of your component
     * config define a constant integer that represents your current version
     * @example
     * // in component creation
     * k.constant('__version', '', 1)
     *
     * // in hook
     * versionUpdate (componentConfig) {
     *   let newConfig = {...componentConfig}
     *
     *   if(!newConfig.__version){
     *     newConfig.__version = 1
     *     // other transformation
     *   }
     *
     *   if(newConfig.__version === 1){
      *     newConfig.__version = 2
      *     // other transformation
      *   }
      *
      *   return newConfig
     * }
     */
    versionUpdate?: (componentConfig: ComponentConfig) => ComponentConfig;
    /**
     * Here you can change the original component config. E.g you can transform a markdown string
     * into a html-string. You are not allowed to change the shape of your component config. Everything
     * additional data you want to add to your component props you have to define in "createContext"
     * @example
     * async preprocessProps(componentConfig) {
     *   return {
     *     ...componentConfig
     *     content: markdownToHtml(componentConfig.content)
     *   }
     * }
     */
    preprocessProps?: (componentConfig: ComponentConfig) => ComponentConfig | Promise<ComponentConfig>;
    /**
     * Return anything you want to have as aditional data in addition to the component config. This
     * will be accesable in your component with "props.context". You can do some heavy computation
     * here since this will only be excuted on the server. Try to pre-calculate as much as possible here
     * so your component does not have to waste computation power. The component config is the same as returned
     * by the hook ""preprocessProps".
     * @example
     * async createContext(componentConfig) {
     *   return await fetchProductSuggestions(componentConfig.productId)
     * }
     */
    createContext?: (componentConfig: ComponentConfig, opt: {
        getGridContext: () => GridContext;
    }) => Context | Promise<Context>;
    /**
     * Sometimes you want to some context to the whole story. E.g your component adds something
     * to your redux-store and you want to hydrate it. In "createStoryEvents" you can return a
     * array of anything that will be accesable with "story.storyEvents". Each controller that
     * implements this hook adds its returned items to this list. It is up to you how to handle
     * these events in your application
     * @example
     * async createStoryEvents(componentConfig) {
     *   return [{
     *     type: 'PARTIAL_STATE_UPDATE',
     *     path: ['user', componentConfig.userId, 'lastActive'],
     *     payload: await fetchLastActiveStatus(componentConfig.userId)
     *   }]
     * }
     */
    createStoryEvents?: (componentConfig: ComponentConfig & {
        context: Context;
    }) => Array<any> | Promise<Array<any>>;
};
/**
 * Basic building block for stories
 */
export declare type Component = {
    name: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    props: {
        gridArea: string;
    };
};
/**
 * Format in which grid will be saved in fireside connector (e.g Contentful)
 * Can be transformed further with fireside-utils
 */
export declare type RawGrid = {
    enabled: boolean;
    gap: number;
    grid: string[][];
    widths: string[];
    heights: string[];
};
/**
 * Format in which Story will be saved in fireside connector (e.g Contentful)
 * Can be transformed further with fireside-utils
 */
export declare type RawStory = {
    version: '1.0.0' | '2.0.0';
    hash: string;
    componentsById: Record<string, Component>;
    allComponents: string[];
    grids: Record<string, RawGrid>;
    plugins: {
        [key: string]: any;
    };
};
/**
 * RawStory is transformed in this format which can be used in apps
 */
export declare type FormattedStory = {
    hash: string;
    events: any[];
    componentsById: Record<string, Component>;
    allComponents: string[];
    grids: Record<string, string>;
    plugins: {
        [key: string]: any;
    };
};
export declare type GridContext = {
    minRow: number;
    maxRow: number;
    byMediaSize: {
        [ms: string]: {
            row: number;
            col: number;
            totalRows: number;
            totalCols: number;
            colStretch: number;
            rowStretch: number;
        };
    };
};
