"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
var utils_1 = require("./utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    ctx.extendComponentButtonList({
        onClickFn: function (c) { return function () {
            ctx.actions.triggerSnackbarEvent({
                type: "info",
                title: "Component copied to clipboard",
                content: "You can now paste it into a story.",
            });
            localStorage.setItem("copy-storybook-component", JSON.stringify(c));
            localStorage.setItem("copy-storybook-component-timestamp", new Date().toString());
        }; },
        btnLabel: "Copy Component",
        btnPlacement: "component",
        btnRenderCondition: true,
    });
    ctx.extendComponentButtonList({
        onClickFn: function (c) {
            var component = localStorage.getItem("copy-storybook-component");
            var timestamp = localStorage.getItem("copy-storybook-component-timestamp");
            // Using localStorage, mimic copyToClipboard by checking if component is older than x
            if (timestamp && !utils_1.isOlderThanXMins(timestamp)) {
                ctx.actions.addComponentToComponentList(component);
            }
            else {
                ctx.actions.triggerSnackbarEvent({
                    type: "warning",
                    title: "Cannot paste component",
                    content: "Please copy a component first",
                });
            }
        },
        btnLabel: "Insert Component",
        btnPlacement: "global",
        btnRenderCondition: function () { return true; },
    });
    ctx.extendSettingsPage({
        row: {
            title: "Copy Story",
            component: function (api) {
                var modalConfirmed = false;
                var showInfoModal = function () {
                    var timestamp = localStorage.getItem("copy-storybook-story-timestamp");
                    if (!timestamp || utils_1.isOlderThanXMins(timestamp)) {
                        ctx.actions.triggerSnackbarEvent({
                            type: "warning",
                            title: "Cannot paste component",
                            content: "Please copy a component first",
                        });
                    }
                    else if (!modalConfirmed) {
                        ctx.actions.alert({
                            title: "Insert whole story",
                            description: "This will insert the whole story into the current story. This will overwrite the current story",
                        });
                        modalConfirmed = true;
                    }
                    else {
                        var story = JSON.parse(localStorage.getItem("copy-storybook-story"));
                        ctx.actions.updateStory(story);
                        ctx.actions.triggerSnackbarEvent({
                            type: "info",
                            title: "Story inserted",
                            content: "The story was inserted and the current story was overriden",
                        });
                    }
                };
                var copyWholeStoryLocalStorage = function (story) {
                    localStorage.setItem("copy-storybook-story", JSON.stringify(story));
                    localStorage.setItem("copy-storybook-story-timestamp", new Date().toString());
                    ctx.actions.triggerSnackbarEvent({
                        type: "info",
                        title: "Story copied",
                        content: "The story was copied. You can now paste it into another story.",
                    });
                };
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return copyWholeStoryLocalStorage(api.story); }, style: styles.btn() }, "Copy whole story"),
                    React.createElement("button", { onClick: function () { return showInfoModal(); }, style: styles.btn() }, "Insert whole story")));
            },
        },
    });
    return undefined;
});
var styles = {
    btn: function () { return ({
        height: "40px",
        fontSize: "16px",
        border: "none",
        backgroundColor: "#f1f1f1",
        cursor: "pointer",
        borderRadius: "3px",
        marginRight: "10px",
    }); },
};
//# sourceMappingURL=index.js.map