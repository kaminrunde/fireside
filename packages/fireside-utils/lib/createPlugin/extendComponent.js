"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendComponent(config) {
    var events = [];
    if (config.badge)
        events.push({
            type: 'COMPONENT_BADGE',
            payload: config.badge
        });
    if (config.icon)
        events.push({
            type: 'COMPONENT_ICON',
            payload: config.icon
        });
    if (config.settingsModal)
        events.push({
            type: 'COMPONENT_SETTINGS',
            payload: config.settingsModal
        });
    return [];
}
exports.default = extendComponent;
//# sourceMappingURL=extendComponent.js.map