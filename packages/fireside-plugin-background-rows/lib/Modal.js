"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
function Modal(props) {
    return (React.createElement("span", null, "Hello World")
    // <Wrapper>
    //   {props.options.colors.map(c => (
    //     <Opt 
    //       key={c.color}
    //       bg={c.color}
    //     />
    //   ))}
    // </Wrapper>
    );
}
exports.default = Modal;
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Opt = styled_components_1.default.div.attrs(function (p) { return ({
    style: {
        background: p.bg
    }
}); })(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 50px;\n  height: 50px;\n  border-radius: 5px;\n  border: 1px solid black;\n"], ["\n  width: 50px;\n  height: 50px;\n  border-radius: 5px;\n  border: 1px solid black;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=Modal.js.map