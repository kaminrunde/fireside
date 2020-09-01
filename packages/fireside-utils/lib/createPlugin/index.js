"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendComponent_1 = require("./extendComponent");
function createPlugin(cb) {
    return function (options) {
        var events = [];
        var context = {
            extendComponent: function (config) { events.push.apply(events, extendComponent_1.default(config, options)); },
            options: options
        };
        var initialState = cb(context, options);
        events.push({ type: 'INITIAL_STATE', meta: options, payload: initialState });
        return events;
    };
}
exports.default = createPlugin;
//# sourceMappingURL=index.js.map