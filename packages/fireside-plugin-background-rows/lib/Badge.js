"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
function Badge(props) {
    try {
        var label_1 = props.state[props.mediaSize][props.row];
        var color = props.options.colors.find(function (c) { return c.label === label_1; });
        return (React.createElement(Wrapper, { bg: color.color }));
    }
    catch (e) {
        return null;
    }
}
exports.default = Badge;
var Wrapper = styled_components_1.default.div.attrs(function (p) { return ({
    style: {
        background: p.bg
    }
}); })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n"], ["\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n"])));
var templateObject_1;
//# sourceMappingURL=Badge.js.map