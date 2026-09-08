import * as at from "./const";
import { Action } from "./actions";

export type State = {
  /** what is typed into the component list search */
  query: string;
};

export const defaultState: State = {
  query: "",
};

/**
 * lives in its own module so it survives navigation. The ui module would be
 * the obvious home, but its CLEAR rule wipes that state on every
 * LOCATION_CHANGE - which is exactly what must not happen here
 */
export default function reducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case at.SET_QUERY:
      return state.query === action.payload
        ? state
        : { ...state, query: action.payload };
    default:
      return state;
  }
}
