import { State } from "./reducer";

export const getQuery = (state: State): string => state.query;
