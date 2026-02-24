"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = onStoryUpdate;
function onStoryUpdate(config, options) {
    var events = [];
    events.push({
        type: "ON_STORY_UPDATE",
        meta: { key: options.key },
        payload: config,
    });
    return events;
}
//# sourceMappingURL=onStoryUpdate.js.map