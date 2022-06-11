"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onStoryUpdate(config, options) {
    var events = [];
    events.push({
        type: 'ON_STORY_UPDATE',
        meta: { key: options.key },
        payload: config
    });
    return events;
}
exports.default = onStoryUpdate;
//# sourceMappingURL=onStoryUpdate.js.map