"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
function Modal(props) {
    var handleColorClick = function (color) { return function () {
        var _a, _b;
        props.setState(__assign(__assign({}, props.state), (_a = {}, _a[props.mediaSize] = __assign(__assign({}, props.state[props.mediaSize]), (_b = {}, _b[props.row] = color, _b)), _a)));
    }; };
    var optIsActive = function (color) {
        if (!props.state[props.mediaSize])
            return;
        return props.state[props.mediaSize][props.row] === color;
    };
    return (React.createElement(Wrapper, null, props.options.colors.map(function (c) { return (React.createElement(Opt, { onClick: handleColorClick(c.label), key: c.color, bg: c.color, active: optIsActive(c.label) })); })));
}
exports.default = Modal;
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n  display: flex;\n  gap: 20px;\n"], ["\n  padding: 20px;\n  display: flex;\n  gap: 20px;\n"])));
var Opt = styled_components_1.default.div.attrs(function (p) { return ({
    style: {
        background: p.bg,
    }
}); })(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 50px;\n  height: 50px;\n  border-radius: 5px;\n  border: ", "px solid black;\n  cursor: pointer;\n"], ["\n  width: 50px;\n  height: 50px;\n  border-radius: 5px;\n  border: ", "px solid black;\n  cursor: pointer;\n"])), function (p) { return p.active ? '6' : '1'; });
var templateObject_1, templateObject_2;
//# sourceMappingURL=Modal.js.map