"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createComponentGridContexts(story) {
    var dict = {};
    var areaByIdDict = {};
    for (var id in story.componentsById) {
        areaByIdDict[story.componentsById[id].props.gridArea] = id;
    }
    var byMediaSize = {};
    var minRow = 100000000;
    var maxRow = 0;
    for (var id in story.componentsById) {
        var component = story.componentsById[id];
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
                for (var x = 0; x < grid.grid[y].length; x++) {
                    if (grid.grid[y][x] !== areaByIdDict[component.props.gridArea])
                        continue;
                    if (row === -1) {
                        row = y;
                    }
                    else if (y >= row + rowStretch) {
                        rowStretch++;
                    }
                    if (col === -1) {
                        col = x;
                    }
                    else if (x >= col + colStretch) {
                        colStretch++;
                    }
                    if (minRow > y)
                        minRow = y;
                    if (maxRow < y)
                        maxRow = y;
                }
            if (row !== -1) {
                byMediaSize[ms] = { totalRows: totalRows, totalCols: totalCols, row: row, col: col, colStretch: colStretch, rowStretch: rowStretch };
            }
        }
        dict[id] = { minRow: minRow, maxRow: maxRow, byMediaSize: byMediaSize };
    }
    return dict;
}
exports.default = createComponentGridContexts;
//# sourceMappingURL=createComponentGridContexts.js.map