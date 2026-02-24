"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatGrid;
function formatGrid(grid, config) {
    if (!grid.enabled)
        return "";
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
    grid.grid.forEach(function (row, i) {
        return row.forEach(function (area, j) {
            if (!gridAreasRaw[area])
                gridAreasRaw[area] = [
                    [i + 1, j + 1],
                    [i + 2, j + 2],
                ];
            gridAreasRaw[area][1][0] = i + 2;
            gridAreasRaw[area][1][1] = j + 2;
        });
    });
    for (var name_2 in gridAreasRaw) {
        var c = gridAreasRaw[name_2];
        gridAreas[name_2] = "".concat(c[0][0], "/").concat(c[0][1], "/").concat(c[1][0], "/").concat(c[1][1]);
    }
    var result = "grid-template-columns:".concat(grid.widths.join(" "), ";") +
        "grid-template-rows:".concat(grid.heights.join(" "), ";") +
        "grid-gap:".concat(grid.gap, "px;");
    if (unusedIds.length) {
        result +=
            ">" +
                unusedIds.map(function (id) { return ".".concat(config.gridAreas[id]); }).join(",>") +
                "{display:none;}";
    }
    for (var _e = 0, usedIds_1 = usedIds; _e < usedIds_1.length; _e++) {
        var id = usedIds_1[_e];
        result +=
            ">.".concat(config.gridAreas[id], "{") +
                "grid-area:".concat(gridAreas[id], ";") +
                "display:flex;" +
                "}";
    }
    return result;
}
//# sourceMappingURL=formatGrid.js.map