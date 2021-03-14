"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createComponentGridContexts(story) {
    var dict = {};
    for (var id in story.componentsById) {
        var component = story.componentsById[id];
        var minRow = 100000000;
        var maxRow = 0;
        var byMediaSize = {};
        for (var ms in story.grids) {
            var grid = story.grids[ms];
            var totalRows = grid.heights.length;
            var totalCols = grid.widths.length;
            var row = -1;
            var col = -1;
            var colStretch = 1;
            var rowStretch = 1;
            // calc
            for (var y = 0; y < grid.grid.length; y++)
                for (var x = void 0; x < grid.grid[y].length; x++) {
                    if (grid.grid[y][x] !== component.props.gridArea)
                        continue;
                    if (row === -1)
                        row = y;
                    else
                        rowStretch++;
                    if (col === -1)
                        col = x;
                    else
                        colStretch++;
                    if (minRow > y)
                        minRow = y;
                    if (maxRow < y)
                        maxRow = y;
                }
            byMediaSize[ms] = { totalRows: totalRows, totalCols: totalCols, row: row, col: col, colStretch: colStretch, rowStretch: rowStretch };
        }
        dict[id] = { minRow: minRow, maxRow: maxRow, byMediaSize: byMediaSize };
    }
    return dict;
}
exports.default = createComponentGridContexts;
//# sourceMappingURL=createComponentGridContexts.js.map