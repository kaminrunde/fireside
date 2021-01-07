"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendComponent(config, options) {
    var events = [];
    if (config.badge)
        events.push({
            type: 'COMPONENT_BADGE',
            meta: { key: options.key },
            payload: config.badge
        });
    if (config.icon)
        events.push({
            type: 'COMPONENT_ICON',
            meta: { key: options.key },
            payload: config.icon
        });
    if (config.settingsModal)
        events.push({
            type: 'COMPONENT_SETTINGS',
            meta: { key: options.key },
            payload: config.settingsModal
        });
    return events;
}
exports.default = extendComponent;
//# sourceMappingURL=extendComponent.js.map