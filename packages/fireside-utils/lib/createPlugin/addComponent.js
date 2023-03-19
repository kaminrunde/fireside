"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendComponentButtonList(config, options) {
    var events = [];
    events.push({
        type: "EXTEND_COMPONENT_BUTTON_LIST",
        meta: { key: options.key },
        payload: config,
    });
    return events;
}
exports.default = extendComponentButtonList;
//# sourceMappingURL=addComponent.js.map