import { FaArrowsAltH } from "react-icons/fa";
import { createPlugin } from "@kaminrunde/fireside-utils";
import produce from "immer";

type State = {
  [componentId: string]: {
    [mediaSize: string]: boolean;
  };
};

export default createPlugin<State, { key: string }>((ctx) => {
  ctx.extendComponent({
    badge: {
      component: FaArrowsAltH,
      isActive: ({ state, component, mediaSize }) => {
        if (!state[component.id]) return false;
        return !!state[component.id][mediaSize];
      },
    },
    icon: {
      component: FaArrowsAltH,
      isActive: ({ state, component, mediaSize }) => {
        if (!state[component.id]) return false;
        return !!state[component.id][mediaSize];
      },
      onClick: ({ state, component, mediaSize, setState }) => {
        setState(
          produce(state, (draft) => {
            if (!draft[component.id]) draft[component.id] = {};
            draft[component.id][mediaSize] = !draft[component.id][mediaSize];
            if (!draft[component.id][mediaSize])
              delete draft[component.id][mediaSize];
            if (Object.keys(draft[component.id]).length === 0) {
              delete draft[component.id];
            }
          })
        );
      },
    },
  });
  return {};
});
