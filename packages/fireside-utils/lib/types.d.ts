export declare type Config = {};
export declare type RawStory = {
    hash: string;
    componentsById: Record<string, {
        name: string;
        id: string;
        props: {
            gridArea: string;
        };
    }>;
    allComponents: string[];
    grids: {
        [size: string]: {
            enabled: boolean;
            gap: number;
            grid: string[][];
            widths: string[];
            heights: string[];
        };
    };
};
export declare type FormattedStory = {};
