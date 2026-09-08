import * as t from "../types";

/**
 * icons the editor can render for a button. A button that names one is shown
 * directly in the component row, one without stays behind the row's context
 * menu, where its label is the only thing to go by
 */
export type ButtonIcon =
  | "copy"
  | "paste"
  | "duplicate"
  | "link"
  | "star"
  | "settings";

export type ExtendComponentButtonList<State> = {
  /**
   * The function to execute when the button is clicked
   */
  onClickFn: (api?: t.PluginComponentAPI<State>) => any;
  /**
   * The descriptive label displayed on the button. When btnIcon is set this
   * becomes the tooltip instead
   */
  btnLabel: string;
  /**
   * Render the button as an icon directly in the row instead of hiding it
   * behind the context menu. Only has an effect for btnPlacement "component"
   */
  btnIcon?: ButtonIcon;
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

export default function extendComponentButtonList<
  State,
  Options extends t.PluginOptions
>(config: ExtendComponentButtonList<State>, options: Options): t.PluginEvent[] {
  let events: t.PluginEvent[] = [];

  events.push({
    type: "EXTEND_COMPONENT_BUTTON_LIST",
    meta: { key: options.key },
    payload: config,
  });

  return events;
}
