import "./rules";

import { State } from "./reducer";
import * as a from "./actions";
import * as c from "./const";
import * as s from "./selectors";

export { a, c, s };
export { default } from "./reducer";

export { default as useSelection } from "./hooks/useSelection";

declare global {
  interface RootState {
    selection: State;
  }
  interface ModuleActions {
    selection: a.Action;
  }
}
