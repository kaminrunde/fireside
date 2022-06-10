"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * We need to sort the compnents by their order in DOM. The browser starts rendering
 * as soon as there are 20 000 chars of the DOM available. for large stories this could
 * be problematic, because the first displayed component does not need to be the first in the
 * DOM (css-grid). this could lead to browser flickering
 *
 * The sorting logic:
 * - we think in rows!
 * - each componen should be at the position where it is in the DOM
 * - when two media-sizes have he same component at different row,
 */
function sortComponents(story) {
    var byRowWithMedia = {};
    var byRow = {};
    for (var ms in story.grids) {
        byRowWithMedia[ms] = {};
        var grid = story.grids[ms];
        for (var row = 0; row < grid.grid.length; row++) {
            for (var _i = 0, _a = grid.grid[row]; _i < _a.length; _i++) {
                var id = _a[_i];
                if (id in byRowWithMedia[ms])
                    continue;
                byRowWithMedia[ms][id] = row;
            }
        }
    }
    for (var _b = 0, _c = story.allComponents; _b < _c.length; _b++) {
        var id = _c[_b];
        for (var ms in story.grids) {
        }
    }
    // const sortedComponents = story.allComponents.sort((a,b) => {
    // })
    return story;
}
exports.default = sortComponents;
//# sourceMappingURL=sortComponents.js.map