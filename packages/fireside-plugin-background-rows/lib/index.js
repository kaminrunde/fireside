"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
var Modal_1 = require("./Modal");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    ctx.extendGridRow({
        badge: {
            component: function () { return 'B'; },
            isActive: function (p) { return p.row in (p.state[p.mediaSize] || {}); }
        },
        settingsModal: {
            title: 'Background',
            component: function (props) { return React.createElement(Modal_1.default, __assign({}, props.api, { options: ctx.options })); }
        }
    });
    return {};
});
//# sourceMappingURL=index.js.map