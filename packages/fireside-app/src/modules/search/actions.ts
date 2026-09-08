import * as at from "./const";

export const setQuery = (query: string) => ({
  type: at.SET_QUERY,
  payload: query,
});

export type SetQuery = ReturnType<typeof setQuery>;

export type Action = SetQuery;
