import { Component } from "@kaminrunde/fireside-utils";
import { add } from "modules/components/actions";
import * as selection from "modules/selection/actions";
import * as search from "modules/search/actions";
import store from "store";
import { v4 as uuidv4 } from "uuid";

export default function addComponentToComponentList(component: string) {
  let parsedComponent: Component = JSON.parse(component);
  parsedComponent.id = uuidv4();
  const state = store.getState().components.byId;
  parsedComponent = updateGridAreaIfDuplicate(state, parsedComponent);
  store.dispatch(add(parsedComponent));

  // make the new component the active one, the component list scrolls to the
  // active entry. A running search could hide it, so it is dropped first
  if (store.getState().search.query) store.dispatch(search.setQuery(""));
  store.dispatch(selection.set([parsedComponent.id], parsedComponent.id));
}

const updateGridAreaIfDuplicate = (
  currentComponents: {
    [randomId: string]: Component;
  },
  parsedComponent: Component
) => {
  const gridAreas = Object.values(currentComponents).map(
    (item) => item.props.gridArea
  );
  const baseGridArea = parsedComponent.props.gridArea.replace(/\d+$/, "");

  let suffix = 1;
  while (gridAreas.includes(parsedComponent.props.gridArea)) {
    parsedComponent.props.gridArea = baseGridArea + suffix;
    suffix++;
  }

  return parsedComponent;
};
