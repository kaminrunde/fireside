"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const String_1 = __importDefault(require("./String"));
const Constant_1 = __importDefault(require("./Constant"));
const Number_1 = __importDefault(require("./Number"));
const Markdown_1 = __importDefault(require("./Markdown"));
const Bool_1 = __importDefault(require("./Bool"));
const StringList_1 = __importDefault(require("./StringList"));
const ObjectList_1 = __importDefault(require("./ObjectList"));
const CustomKnobPlaceholder_1 = __importDefault(require("./CustomKnobPlaceholder"));
const Select_1 = __importDefault(require("./Select"));
function getWidget(knob, customComponents) {
    if (knob.type === "custom-knob") {
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
        stringList: StringList_1.default,
        objectList: ObjectList_1.default,
        select: Select_1.default,
    }[knob.type];
}
exports.default = getWidget;
