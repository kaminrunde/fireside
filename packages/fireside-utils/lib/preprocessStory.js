"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preprocessComponent_1 = require("./preprocessComponent");
var formatGrid_1 = require("./formatGrid");
function preprocessStory(story, config) {
    var formatted = {
        hash: story.hash,
        componentsById: {},
        allComponents: story.allComponents,
        grids: {}
    };
    story.allComponents
        .map(function (name) { return story.componentsById[name]; })
        .map(function (c) { return preprocessComponent_1.default(c, {}); })
        .forEach(function (c, i) {
        formatted.componentsById[story.allComponents[i]] = c;
    });
    Object.entries(story.grids)
        .map(function (_a) {
        var key = _a[0], val = _a[1];
        return [key, formatGrid_1.default(val, {})];
    })
        .forEach(function (_a) {
        var key = _a[0], val = _a[1];
        formatted.grids[key] = val;
    });
    return formatted;
}
exports.default = preprocessStory;
//# sourceMappingURL=preprocessStory.js.map