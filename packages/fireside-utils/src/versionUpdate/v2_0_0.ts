import * as t from "../types";

export default function update_2_0_0(story: t.RawStory): t.RawStory {
  if (story.version === "1.0.0") {
    story = { ...story };
    story.version = "2.0.0";
    let componentsById: t.RawStory["componentsById"] = {};
    let grids: t.RawStory["grids"] = {};

    const gridAreaToId: Record<string, string> = {};

    for (let key in story.componentsById) {
      componentsById[story.componentsById[key].id] = story.componentsById[key];
      gridAreaToId[key] = story.componentsById[key].id;
    }
    for (let ms in story.grids) {
      const grid = { ...story.grids[ms] };
      grid.grid = [...grid.grid];
      for (let i = 0; i < grid.grid.length; i++) {
        const cells = [];
        for (let cell of grid.grid[i]) cells.push(gridAreaToId[cell]);
        grid.grid[i] = cells;
      }

      grids[ms] = grid;
    }

    story.componentsById = componentsById;
    story.grids = grids;
    story.allComponents = story.allComponents.map(
      (gridArea) => gridAreaToId[gridArea]
    );
  }

  return story;
}
