import * as at from "./const";

/**
 * replace the whole selection. The anchor is the item a following
 * shift-click measures its range from
 */
export const set = (ids: string[], anchor: string | null = null) => ({
  type: at.SET,
  meta: { anchor },
  payload: ids,
});

/** add a single component to the selection or remove it when already selected */
export const toggle = (id: string) => ({
  type: at.TOGGLE,
  payload: id,
});

export const clear = () => ({
  type: at.CLEAR,
});

/** drop every selected id that is not part of the given component list anymore */
export const prune = (existingIds: string[]) => ({
  type: at.PRUNE,
  payload: existingIds,
});

export type Set = ReturnType<typeof set>;
export type Toggle = ReturnType<typeof toggle>;
export type Clear = ReturnType<typeof clear>;
export type Prune = ReturnType<typeof prune>;

export type Action = Set | Toggle | Clear | Prune;
