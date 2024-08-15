import { State } from "./reducer";
import * as t from "./types";

export const getActiveMediaSizes = (state: State): t.MS =>
  state.activeMediaSizes;
