import { addRule } from "redux-ruleset";
import * as $components from "modules/components";
import * as a from "./actions";
import * as at from "./const";
import * as s from "./selectors";

/**
 * When the component list changes (another story is loaded or a
 * component gets deleted)
 * Then we drop every selected id that does not exist anymore
 */
addRule<$components.a.Init | $components.a.Remove>({
  id: "selection/PRUNE",
  target: [$components.c.INIT, $components.c.REMOVE],
  output: at.PRUNE,
  condition: (_, { getState }) =>
    s.getSelection(getState().selection).length > 0,
  consequence: (_, { getState }) => {
    const components = $components.s.getComponents(getState().components);
    return a.prune(components.map((c) => c.id));
  },
});
