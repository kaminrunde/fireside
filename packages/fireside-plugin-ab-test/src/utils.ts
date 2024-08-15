import { RawStory } from "@kaminrunde/fireside-utils";
import * as t from "./types";

export function updateStateByComponents(state: t.State, story: RawStory) {
  let byId: t.State["byId"] = {};
  for (const ms in state.components) {
    for (let row of state.components[ms].A) {
      if (!story.grids[ms]) continue;
      const gridRow = story.grids[ms].grid[row];
      for (const id of gridRow) {
        if (!byId[id]) byId[id] = {};
        byId[id][ms] = "A";
      }
    }
    for (let row of state.components[ms].B) {
      if (!story.grids[ms]) continue;
      const gridRow = story.grids[ms].grid[row];
      for (const id of gridRow) {
        if (!byId[id]) byId[id] = {};
        byId[id][ms] = "B";
      }
    }
  }

  state.byId = byId;
}
