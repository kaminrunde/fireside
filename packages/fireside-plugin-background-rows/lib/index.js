"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fa_1 = require("react-icons/fa");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    ctx.extendGridRow({
        badge: {
            component: fa_1.FaArrowsAltH,
            isActive: function () { return true; }
        },
        icon: {
            component: fa_1.FaArrowsAltH,
            isActive: function () { return true; },
            onClick: function () { return null; }
        }
    });
    return {};
});
//# sourceMappingURL=index.js.map