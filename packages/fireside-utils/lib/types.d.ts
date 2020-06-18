export declare type Config = {
    resolveController: (name: string) => Controller | Promise<Controller>;
};
export declare type Controller = {
    versionUpdate?: Function;
    createContext?: Function;
    preprocessProps?: Function;
    createStoryEvents?: Function;
};
/**
 * Basic building block for stories
 */
export declare type Component = {
    name: string;
    id: string;
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
    hash: string;
    componentsById: Record<string, Component>;
    allComponents: string[];
    grids: Record<string, RawGrid>;
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
};
