"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
                var showInfoModal = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var timestamp, result, story;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                timestamp = localStorage.getItem("copy-storybook-story-timestamp");
                                if (!(!timestamp || utils_1.isOlderThanXMins(timestamp))) return [3 /*break*/, 1];
                                ctx.actions.triggerSnackbarEvent({
                                    type: "warning",
                                    title: "Cannot paste component",
                                    content: "Please copy a component first",
                                });
                                return [3 /*break*/, 3];
                            case 1:
                                if (!!modalConfirmed) return [3 /*break*/, 3];
                                return [4 /*yield*/, ctx.actions.alert({
                                        title: "Insert whole story",
                                        description: "This will insert the whole story into the current story. This will overwrite the current story",
                                    })];
                            case 2:
                                result = _a.sent();
                                if (result === "OK") {
                                    story = JSON.parse(localStorage.getItem("copy-storybook-story"));
                                    ctx.actions.updateStory(story);
                                    ctx.actions.triggerSnackbarEvent({
                                        type: "info",
                                        title: "Story inserted",
                                        content: "The story was inserted and the current story was overriden",
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
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