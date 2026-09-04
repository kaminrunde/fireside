import produce from "immer";
import * as at from "./const";
import { Action } from "./actions";

export type State = {
  /** ids of the currently selected components */
  ids: string[];
  /** last individually clicked id. shift-click selects the range from here */
  anchor: string | null;
};

export const defaultState: State = {
  ids: [],
  anchor: null,
};

export default produce((state = defaultState, action: Action) => {
  switch (action.type) {
    case at.SET: {
      state.ids = action.payload;
      state.anchor = action.meta.anchor;
      return;
    }
    case at.TOGGLE: {
      const index = state.ids.indexOf(action.payload);
      if (index === -1) state.ids.push(action.payload);
      else state.ids.splice(index, 1);
      state.anchor = action.payload;
      return;
    }
    case at.CLEAR: {
      if (!state.ids.length && !state.anchor) return;
      return defaultState;
    }
    case at.PRUNE: {
      const existing = new Set(action.payload);
      const ids = state.ids.filter((id) => existing.has(id));
      if (ids.length !== state.ids.length) state.ids = ids;
      if (state.anchor && !existing.has(state.anchor)) state.anchor = null;
      return;
    }
  }
}, defaultState);
