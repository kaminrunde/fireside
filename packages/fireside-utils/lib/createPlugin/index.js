"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendComponent_1 = require("./extendComponent");
var extendGridRow_1 = require("./extendGridRow");
var extendSettingsPage_1 = require("./extendSettingsPage");
var createPage_1 = require("./createPage");
function createPlugin(cb) {
    return function (options, actions) {
        var events = [];
        var context = {
            extendComponent: function (config) { events.push.apply(events, extendComponent_1.default(config, options)); },
            extendGridRow: function (config) { events.push.apply(events, extendGridRow_1.default(config, options)); },
            extendSettingsPage: function (config) { events.push.apply(events, extendSettingsPage_1.default(config, options)); },
            createPage: function (config) { events.push.apply(events, createPage_1.default(config, options)); },
            options: options,
            actions: actions
        };
        var initialState = cb(context, options);
        events.push({ type: 'INITIAL_STATE', meta: options, payload: initialState });
        return events;
    };
}
exports.default = createPlugin;
//# sourceMappingURL=index.js.map