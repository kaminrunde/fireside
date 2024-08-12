import * as at from "./const";
import * as t from "./types";
import { Action } from "./actions";

export type State = {
  byId: Record<string, t.Component>;
  allIds: string[];
  isLoading: boolean;
  loadId: string | null;
};

export const defaultState: State = {
  byId: {},
  allIds: [],
  isLoading: false,
  loadId: null,
};

export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.INIT:
      return {
        ...defaultState,
        ...action.payload,
      };
    case at.LOAD:
      return {
        ...state,
        isLoading: true,
        loadId: action.payload || null,
      };
    case at.UNLOAD:
      return {
        ...state,
        isLoading: false,
        loadId: null,
      };
    case at.ADD:
      return {
        ...state,
        allIds: [...state.allIds, action.payload.id],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case at.REMOVE: {
      let allIds = state.allIds.filter((id) => id !== action.payload.id);
      let byId: Record<string, t.Component> = {};
      for (let id of allIds) byId[id] = state.byId[id];
      return { ...state, allIds, byId };
    }
    case at.UPDATE_COMPONENT: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.meta.componentId]: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
