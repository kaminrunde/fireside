declare type PluginOptions = {
    key: string;
    password?: string;
    blacklist?: string[];
};
declare const _default: (options: PluginOptions) => import("@kaminrunde/fireside-utils").PluginEvent[];
export default _default;
