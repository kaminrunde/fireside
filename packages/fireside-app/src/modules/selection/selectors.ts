import { State } from "./reducer";

export const getSelection = (state: State): string[] => state.ids;

export const getAnchor = (state: State): string | null => state.anchor;
