"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
function String(props) {
    return (React.createElement(Wrapper, { focus: props.focus },
        React.createElement("input", { type: 'number', value: props.value, onChange: e => props.onChange(e.target.value) })));
}
exports.default = String;
const Wrapper = styled_components_1.default.div `
  border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
  border-radius: 3px;
  padding-left: 5px;
  > input {
    width: 100%;
    border: none;
    line-height: 30px;
  }
`;
//# sourceMappingURL=Number.js.map