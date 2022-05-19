"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStateByComponents = void 0;
function updateStateByComponents(state, story) {
    var byId = {};
    for (var ms in state.components) {
        for (var _i = 0, _a = state.components[ms].A; _i < _a.length; _i++) {
            var row = _a[_i];
            if (!story.grids[ms])
                continue;
            var gridRow = story.grids[ms].grid[row];
            for (var _b = 0, gridRow_1 = gridRow; _b < gridRow_1.length; _b++) {
                var id = gridRow_1[_b];
                if (!byId[id])
                    byId[id] = {};
                byId[id][ms] = 'A';
            }
        }
        for (var _c = 0, _d = state.components[ms].B; _c < _d.length; _c++) {
            var row = _d[_c];
            if (!story.grids[ms])
                continue;
            var gridRow = story.grids[ms].grid[row];
            for (var _e = 0, gridRow_2 = gridRow; _e < gridRow_2.length; _e++) {
                var id = gridRow_2[_e];
                if (!byId[id])
                    byId[id] = {};
                byId[id][ms] = 'B';
            }
        }
    }
    state.byId = byId;
}
exports.updateStateByComponents = updateStateByComponents;
//# sourceMappingURL=utils.js.map