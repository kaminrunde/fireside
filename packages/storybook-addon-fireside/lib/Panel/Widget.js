"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const widgets_1 = require("../widgets");
const styled_components_1 = require("styled-components");
function Widget(props) {
    const [value, setValue] = React.useState(props.knob.value);
    const Component = widgets_1.default(props.knob, props.customKnobs);
    const [focus, setFocus] = React.useState(false);
    const update = val => {
        setValue(val);
        props.onUpdate(val);
    };
    if (props.knob.type === 'constant')
        return null;
    const error = props.knob.options.validate
        ? props.knob.options.validate(value)
        : null;
    return (React.createElement(Wrapper, { onFocus: () => setFocus(true), onBlur: () => setFocus(false) },
        React.createElement("h3", { className: 'label' }, props.knob.label),
        props.knob.options.hint && (React.createElement("div", { className: 'hint' }, props.knob.options.hint)),
        error && (React.createElement("div", { className: 'error' }, error)),
        React.createElement(Component, { value: value, onChange: update, focus: focus, hasError: !!error, options: props.knob.options })));
}
exports.default = Widget;
const Wrapper = styled_components_1.default.div `
  padding: 10px;
  &:active {outline:none;}
  > .label {
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 30px;
  }
  > .hint {
    color: grey;
    line-height: 18px;
  }
  > .error {
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
    color: #ff5722;
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;
//# sourceMappingURL=Widget.js.map