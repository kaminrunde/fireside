"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function CustomKnobPlaceholder(props) {
    if (!props.options || !props.options.__name)
        return (React.createElement("div", null, "Some error happened"));
    return React.createElement("div", null,
        "Could not find custom knob with name \"",
        props.options.__name,
        "\"");
}
exports.default = CustomKnobPlaceholder;
//# sourceMappingURL=CustomKnobPlaceholder.js.map