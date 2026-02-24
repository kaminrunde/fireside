"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPage;
function createPage(config, options) {
    var events = [];
    if (config.navigation)
        events.push({
            type: "CREATE_PAGE_NAVIGATION",
            meta: { key: options.key, slug: config.slug },
            payload: config.navigation,
        });
    if (config.page)
        events.push({
            type: "CREATE_PAGE_PAGE",
            meta: { key: options.key, slug: config.slug },
            payload: config.page,
        });
    return events;
}
//# sourceMappingURL=createPage.js.map