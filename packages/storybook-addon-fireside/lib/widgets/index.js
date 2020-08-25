"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const String_1 = require("./String");
const Constant_1 = require("./Constant");
const Number_1 = require("./Number");
const Markdown_1 = require("./Markdown");
const Bool_1 = require("./Bool");
const StringList_1 = require("./StringList");
const ObjectList_1 = require("./ObjectList");
function getWidget(knob) {
    return {
        string: String_1.default,
        constant: Constant_1.default,
        number: Number_1.default,
        markdown: Markdown_1.default,
        bool: Bool_1.default,
        stringList: StringList_1.default,
        objectList: ObjectList_1.default
    }[knob.type];
}
exports.default = getWidget;
//# sourceMappingURL=index.js.map