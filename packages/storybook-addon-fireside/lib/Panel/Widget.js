"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const widgets_1 = require("../widgets");
const styled_components_1 = require("styled-components");
const useCustomComponents_1 = require("./useCustomComponents");
function Widget(props) {
    const customComponents = useCustomComponents_1.default();
    const [value, setValue] = React.useState(props.knob.value);
    const Component = widgets_1.default(props.knob, customComponents);
    const [handle, focus, ref] = useFocus();
    const update = val => {
        setValue(val);
        props.onUpdate(val);
    };
    if (props.knob.type === 'constant')
        return null;
    const error = props.knob.options.validate
        ? props.knob.options.validate(value)
        : null;
    return (React.createElement(Wrapper, { ref: ref, onClick: handle },
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
function useFocus() {
    const [activeEl, setActiveEl] = React.useState(null);
    const ref = React.useRef(null);
    const handle = () => {
        if (activeEl || !ref.current)
            return;
        setActiveEl(ref.current);
    };
    React.useEffect(() => {
        if (!activeEl)
            return;
        const elIsInDropdown = ({ parentElement: el }) => {
            return el ? el === activeEl || elIsInDropdown(el) : false;
        };
        const listener = e => {
            if (!elIsInDropdown(e.target)) {
                window.removeEventListener('click', listener);
                setActiveEl(null);
            }
        };
        window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [activeEl]);
    return [handle, !!activeEl, ref, () => setActiveEl(null)];
}
//# sourceMappingURL=Widget.js.map