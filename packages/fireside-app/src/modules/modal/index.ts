import { State } from "./reducer";
import * as a from "./actions";
import * as c from "./const";
import * as t from "./types";

export { a, c, t };
export { default } from "./reducer";

export { default as useMessage } from "./hooks/useMessage";

declare global {
  interface RootState {
    modal: State;
  }
  interface ModuleActions {
    modal: a.Action;
  }
}
