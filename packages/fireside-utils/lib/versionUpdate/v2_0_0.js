"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update_2_0_0;
function update_2_0_0(story) {
    if (story.version === "1.0.0") {
        story = __assign({}, story);
        story.version = "2.0.0";
        var componentsById = {};
        var grids = {};
        var gridAreaToId_1 = {};
        for (var key in story.componentsById) {
            componentsById[story.componentsById[key].id] = story.componentsById[key];
            gridAreaToId_1[key] = story.componentsById[key].id;
        }
        for (var ms in story.grids) {
            var grid = __assign({}, story.grids[ms]);
            grid.grid = __spreadArray([], grid.grid, true);
            for (var i = 0; i < grid.grid.length; i++) {
                var cells = [];
                for (var _i = 0, _a = grid.grid[i]; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    cells.push(gridAreaToId_1[cell]);
                }
                grid.grid[i] = cells;
            }
            grids[ms] = grid;
        }
        story.componentsById = componentsById;
        story.grids = grids;
        story.allComponents = story.allComponents.map(function (gridArea) { return gridAreaToId_1[gridArea]; });
    }
    return story;
}
//# sourceMappingURL=v2_0_0.js.map