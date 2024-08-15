import { PluginEvent } from "@kaminrunde/fireside-utils";
import { Action } from "./actions";
import * as at from "./const";
import { RawStory } from "@kaminrunde/fireside-utils";

export type State = {
  storyWithoutPlugins: RawStory;
  data: PluginEvent[];
  states: Record<string, any>;
};

export const defaultState: State = {
  storyWithoutPlugins: {
    allComponents: [],
    componentsById: {},
    grids: {},
    hash: "INIT",
    plugins: {},
    version: "2.0.0",
  },
  data: [],
  states: {},
};

export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.INIT:
      return {
        ...state,
        states: {
          ...state.states,
          ...action.payload.plugins,
        },
        storyWithoutPlugins: {
          ...action.payload,
          plugins: action.payload.plugins || {},
        },
      };
    case at.SET_PLUGIN_EVENTS:
      return {
        ...state,
        data: action.payload,
        states: action.payload
          .filter((e) => e.type === "INITIAL_STATE")
          .reduce((states, e) => {
            states[e.meta.key] = state.states[e.meta.key] || e.payload;
            return states;
          }, {}),
      };
    case at.SET_STATE:
      return {
        ...state,
        states: {
          ...state.states,
          [action.meta.key]: action.payload,
        },
      };
    case at.SET_STORY: {
      if (action.payload.hash === state.storyWithoutPlugins.hash) return state;
      let invalidate = false;
      if (
        action.payload.allComponents !== state.storyWithoutPlugins.allComponents
      )
        invalidate = true;
      if (
        action.payload.componentsById !==
        state.storyWithoutPlugins.componentsById
      )
        invalidate = true;
      if (action.payload.grids !== state.storyWithoutPlugins.grids)
        invalidate = true;
      if (!invalidate) return state;
      const { plugins, ...story } = action.payload;
      return {
        ...state,
        storyWithoutPlugins: { ...story, plugins: {} },
      };
    }
    default:
      return state;
  }
}
