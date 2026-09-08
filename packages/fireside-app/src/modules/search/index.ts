import { State } from "./reducer";
import * as a from "./actions";
import * as c from "./const";
import * as s from "./selectors";

export { a, c, s };
export { default } from "./reducer";

export { default as useSearch } from "./hooks/useSearch";

declare global {
  interface RootState {
    search: State;
  }
  interface ModuleActions {
    search: a.Action;
  }
}
