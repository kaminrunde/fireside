import { State } from "./reducer";
import * as t from "./types";
import config from "config";
import { createSelector } from "reselect";

const getEmptyGrid = (mediaSize: string): t.Grid => ({
  gap: config.mediaSizes.find((m) => m.key === mediaSize)?.gap || 0,
  gridAreas: [],
  widths: ["1fr"],
  heights: ["auto"],
});

export const getGrid = (state: State, mediaSize: string): t.Grid =>
  state[mediaSize] || getEmptyGrid(mediaSize);

export const getGridDict = (state: State): State => state;

export const getUsedComponents = createSelector(
  (state: State) => state,
  (state) => {
    let dict = new Set<string>();

    for (let ms in state) {
      for (let area of state[ms].gridAreas) {
        dict.add(area.i);
      }
    }

    return dict;
  }
);
