"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendComponent(cb, api) {
    var events = [];
    var result = cb(api);
    if (result.badge)
        events.push({
            type: 'COMPONENT_BADGE',
            payload: result.badge
        });
    if (result.icon)
        events.push({
            type: 'COMPONENT_ICON',
            payload: result.icon
        });
    if (result.settingsModal)
        events.push({
            type: 'COMPONENT_SETTINGS',
            payload: result.settingsModal
        });
    return [];
}
exports.default = extendComponent;
//# sourceMappingURL=extendComponent.js.map