import * as t from "../types";
export declare type ExtendComponentButtonList<State> = {
    /**
     * The function to execute when the button is clicked
     */
    onClickFn: (api?: t.PluginComponentAPI<State>) => any;
    /**
     * The descriptive label displayed on the button
     */
    btnLabel: string;
    /**
     * Determines where the button is rendered: either for each individual
     * component row (e.g., when a specific component-related action is needed)
     * or once in the storybook for global actions (e.g., adding a new component)
     */
    btnPlacement: "component" | "global";
    /**
     * Determines whether to render the button in the UI or not. For instance,
     * if the button should only be displayed when a specific cookie is set,
     * you can provide a function that checks this condition and returns a boolean
     */
    btnRenderCondition: boolean | ((...args: any) => boolean);
};
export default function extendComponentButtonList<State, Options extends t.PluginOptions>(config: ExtendComponentButtonList<State>, options: Options): t.PluginEvent[];
