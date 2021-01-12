"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendSettingsPage(config, options) {
    var events = [];
    if (config.row)
        events.push({
            type: 'SETTINGS_PAGE_ROW',
            meta: { key: options.key },
            payload: config.row
        });
    return events;
}
exports.default = extendSettingsPage;
//# sourceMappingURL=extendSettingsPage.js.map