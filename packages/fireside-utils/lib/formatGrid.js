"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatGrid(grid, config) {
    var idDict = {};
    for (var _i = 0, _a = grid.grid; _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
            var col = row_1[_b];
            idDict[col] = col;
        }
    }
    var usedIds = [];
    var unusedIds = [];
    for (var _c = 0, _d = config.allIds; _c < _d.length; _c++) {
        var name_1 = _d[_c];
        if (name_1 in idDict)
            usedIds.push(name_1);
        else
            unusedIds.push(name_1);
    }
    var gridAreasRaw = {};
    var gridAreas = {};
    grid.grid.forEach(function (row, i) { return row.forEach(function (area, j) {
        if (!gridAreasRaw[area])
            gridAreasRaw[area] = [[i + 1, j + 1], [i + 2, j + 2]];
        gridAreasRaw[area][1][0] = i + 2;
        gridAreasRaw[area][1][1] = j + 2;
    }); });
    for (var name_2 in gridAreasRaw) {
        var c = gridAreasRaw[name_2];
        gridAreas[name_2] = c[0][0] + " / " + c[0][1] + " / " + c[1][0] + " / " + c[1][1];
    }
    var result = "grid-template-columns: " + grid.widths.join(' ') + ";" +
        ("grid-template-rows: " + grid.heights.join(' ') + ";") +
        ("grid-gap: " + grid.gap + "px;");
    if (unusedIds.length) {
        result += '> ' + unusedIds.map(function (s) { return "." + s; }).join(',') + '{display:none;}';
    }
    for (var _e = 0, usedIds_1 = usedIds; _e < usedIds_1.length; _e++) {
        var name_3 = usedIds_1[_e];
        result +=
            "> ." + name_3 + "{" +
                ("grid-area: " + gridAreas[name_3] + ";") +
                "display: flex;" +
                "}";
    }
    return result;
}
exports.default = formatGrid;
// function createCss (story:t.RawStory) {
//   return `
//     @media(min-width:400px){
//       grid-template-rows: auto auto auto;
//       grid-template-columns: 1fr 1fr;
//       grid-gap: 20px;
//       > .Button-1 {
//         grid-area: 1 / 1 / 1 / 1;
//         display: flex;
//       }
//       > .Button-2, .Button-3 {
//         display: none;
//       }
//     }
//   `
// }
//# sourceMappingURL=formatGrid.js.map