"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendGridRow(config, options) {
    var events = [];
    if (config.badge)
        events.push({
            type: 'GRID_ROW_BADGE',
            meta: options,
            payload: config.badge
        });
    if (config.icon)
        events.push({
            type: 'GRID_ROW_ICON',
            meta: options,
            payload: config.icon
        });
    if (config.settingsModal)
        events.push({
            type: 'GRID_ROW_SETTINGS',
            meta: options,
            payload: config.settingsModal
        });
    return events;
}
exports.default = extendGridRow;
//# sourceMappingURL=extendGridRow.js.map