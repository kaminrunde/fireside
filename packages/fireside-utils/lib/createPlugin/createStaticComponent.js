"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createStaticComponent;
function createStaticComponent(config, options) {
    var events = [];
    events.push({
        type: "CREATE_STATIC_COMPONENT",
        meta: { key: options.key },
        payload: config,
    });
    return events;
}
//# sourceMappingURL=createStaticComponent.js.map