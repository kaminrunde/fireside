"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
function Bool(props) {
    return (React.createElement(Wrapper, { on: props.value, onClick: () => props.onChange(!props.value) }, props.value ? 'ON' : 'OFF'));
}
exports.default = Bool;
const Wrapper = styled_components_1.default.button `
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  background: ${props => props.on ? '#8bc34a' : '#e91e63'};
`;
//# sourceMappingURL=Bool.js.map