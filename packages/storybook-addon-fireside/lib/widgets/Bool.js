"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
function Bool(props) {
    return (React.createElement(Wrapper, null,
        React.createElement("input", { className: "react-switch-checkbox", id: `react-switch-new`, type: "checkbox", onClick: () => props.onChange(!props.value), checked: props.value }),
        React.createElement("label", { style: { background: props.value && 'rgb(29, 167, 253)' }, className: "react-switch-label", htmlFor: `react-switch-new` },
            React.createElement("span", { className: `react-switch-button` }))));
}
exports.default = Bool;
const Wrapper = styled_components_1.default.div `
  margin-top: -15px;
  .react-switch-checkbox {
  height: 0;
  width: 0;
  visibility: hidden;
}

.react-switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 30px;
  background: grey;
  border-radius: 60px;
  position: relative;
  transition: background-color .2s;
}

.react-switch-label .react-switch-button {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
}

.react-switch-checkbox:checked + .react-switch-label .react-switch-button {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.react-switch-label:active .react-switch-button {
  width: 36px;
}
`;
//# sourceMappingURL=Bool.js.map