"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const String_1 = require("./String");
const Constant_1 = require("./Constant");
const Number_1 = require("./Number");
const Markdown_1 = require("./Markdown");
function getWidget(knob) {
    return {
        string: String_1.default,
        constant: Constant_1.default,
        number: Number_1.default,
        markdown: Markdown_1.default
    }[knob.type];
}
exports.default = getWidget;
//# sourceMappingURL=index.js.map