import "./rules";

import { State } from "./reducer";
import * as a from "./actions";
import * as c from "./const";
import * as s from "./selectors";

export { a, c, s };
export { default } from "./reducer";

declare global {
  interface RootState {
    connector: State;
  }
  interface ModuleActions {
    connector: a.Action;
  }
}

export { default as useLoadingStatus } from "./hooks/useLoadingStatus";
