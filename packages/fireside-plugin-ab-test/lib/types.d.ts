export declare type State = {
    components: {
        [ms: string]: {
            A: number[];
            B: number[];
        };
    };
    byId: {
        [id: string]: {
            [ms: string]: 'A' | 'B';
        };
    };
} | undefined;
export declare type PluginOptions = {
    key: string;
    password?: string;
    blacklist?: string[];
};
