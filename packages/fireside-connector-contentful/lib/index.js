"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contentful_ui_extensions_sdk_1 = require("contentful-ui-extensions-sdk");
var sdk = null;
var initValue = 'empty';
var globalCb = function (val) {
    initValue = val;
};
var connector = {
    name: 'contentful',
    onChange: function (cb) {
        globalCb = cb;
        if (initValue !== 'empty')
            cb(initValue);
    },
    setStory: function (story) {
        console.log(story);
        sdk && sdk.field.setValue(story);
    }
};
contentful_ui_extensions_sdk_1.init(function (_sdk) {
    sdk = _sdk;
    try {
        // @ts-ignore
        sdk.window.updateHeight(600);
    }
    catch (e) { }
    var value = sdk.field.getValue();
    globalCb(value);
    sdk.field.onValueChanged(globalCb);
});
exports.default = connector;
//# sourceMappingURL=index.js.map