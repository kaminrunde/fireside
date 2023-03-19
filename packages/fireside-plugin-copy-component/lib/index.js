"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    ctx.extendComponentButtonList({
        onClickFn: function (c) { return function () {
            localStorage.setItem("copy-storybook-component", JSON.stringify(c));
            localStorage.setItem("copy-storybook-component-timestamp", new Date().toString());
        }; },
        btnLabel: "Copy Component",
        btnPlacement: "component",
        btnRenderCondition: true,
    });
    var component = localStorage.getItem("copy-storybook-component");
    ctx.extendComponentButtonList({
        onClickFn: function (c) { return ctx.actions.addComponentToComponentList(component); },
        btnLabel: "Insert Component",
        btnPlacement: "global",
        btnRenderCondition: function () {
            // because we have to use localStorage and cannot use copyToClipboard
            // i decided to check if the component is older than 5 minutes
            // to imitate the copyToClipboard behaviour
            var isOlderThanXMins = function (dateString) {
                var date = new Date(dateString);
                var currentTime = new Date();
                var differenceInMilliseconds = currentTime.getTime() - date.getTime();
                var differenceInMinutes = differenceInMilliseconds / (1000 * 60);
                return differenceInMinutes > 5;
            };
            var timestamp = localStorage.getItem("copy-storybook-component-timestamp");
            if (timestamp !== null && isOlderThanXMins(timestamp)) {
                return false;
            }
            return component === null ? false : true;
        },
    });
    return undefined;
});
//# sourceMappingURL=index.js.map