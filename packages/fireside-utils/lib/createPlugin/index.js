"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPlugin;
var extendComponent_1 = require("./extendComponent");
var extendGridRow_1 = require("./extendGridRow");
var extendSettingsPage_1 = require("./extendSettingsPage");
var createStaticComponent_1 = require("./createStaticComponent");
var createPage_1 = require("./createPage");
var onStoryUpdate_1 = require("./onStoryUpdate");
var extendComponentButtonList_1 = require("./extendComponentButtonList");
function createPlugin(cb) {
    return function (options, actions) {
        var events = [];
        var context = {
            extendComponent: function (config) {
                events.push.apply(events, (0, extendComponent_1.default)(config, options));
            },
            extendGridRow: function (config) {
                events.push.apply(events, (0, extendGridRow_1.default)(config, options));
            },
            extendSettingsPage: function (config) {
                events.push.apply(events, (0, extendSettingsPage_1.default)(config, options));
            },
            extendComponentButtonList: function (config) {
                events.push.apply(events, (0, extendComponentButtonList_1.default)(config, options));
            },
            createPage: function (config) {
                events.push.apply(events, (0, createPage_1.default)(config, options));
            },
            createStaticComponent: function (config) {
                events.push.apply(events, (0, createStaticComponent_1.default)(config, options));
            },
            onStoryUpdate: function (config) {
                events.push.apply(events, (0, onStoryUpdate_1.default)(config, options));
            },
            options: options,
            actions: actions,
        };
        var initialState = cb(context, options);
        events.push({
            type: "INITIAL_STATE",
            meta: options,
            payload: initialState,
        });
        return events;
    };
}
//# sourceMappingURL=index.js.map