"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const String_1 = require("./String");
const Constant_1 = require("./Constant");
const Number_1 = require("./Number");
const Markdown_1 = require("./Markdown");
const Bool_1 = require("./Bool");
// import StringList from './StringList'
// import ObjectList from './ObjectList'
const CustomKnobPlaceholder_1 = require("./CustomKnobPlaceholder");
const Select_1 = require("./Select");
function getWidget(knob, customComponents) {
    if (knob.type === 'custom-knob') {
        // @ts-ignore
        const result = customComponents[knob.options.__name];
        if (!result)
            return CustomKnobPlaceholder_1.default;
        return result;
    }
    return {
        string: String_1.default,
        constant: Constant_1.default,
        number: Number_1.default,
        markdown: Markdown_1.default,
        bool: Bool_1.default,
        stringList: CustomKnobPlaceholder_1.default,
        objectList: CustomKnobPlaceholder_1.default,
        select: Select_1.default
    }[knob.type];
}
exports.default = getWidget;
//# sourceMappingURL=index.js.map