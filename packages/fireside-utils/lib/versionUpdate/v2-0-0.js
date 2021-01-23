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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function update_2_0_0(story) {
    if (story.version === '1.0.0') {
        story = __assign({}, story);
        story.version = '2.0.0';
        var componentsById = {};
        var grids = {};
        var gridAreaToId = {};
        for (var key in story.componentsById) {
            componentsById[story.componentsById[key].id] = story.componentsById[key];
            gridAreaToId[key] = story.componentsById[key].id;
        }
        for (var ms in story.grids) {
            var grid = __assign({}, story.grids[ms]);
            grid.grid = __spreadArrays(grid.grid);
            for (var i = 0; i < grid.grid.length; i++) {
                var cells = [];
                for (var _i = 0, _a = grid.grid[i]; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    cells.push(gridAreaToId[cell]);
                }
                grid.grid[i] = cells;
            }
            grids[ms] = grid;
        }
        story.componentsById = componentsById;
    }
    return story;
}
exports.default = update_2_0_0;
//# sourceMappingURL=v2-0-0.js.map